const std = @import("std");

const Vm = struct { stack: Stack(i32), in: std.fs.File.Reader, out: std.fs.File.Writer };

const Ops = struct {
    inline fn sum(vm: *Vm) !void {
        var right: i32 = vm.stack.pop().?;
        var left: i32 = vm.stack.pop().?;

        try vm.stack.push(left + right);
    }
    inline fn difference(vm: *Vm) !void {
        var right: i32 = vm.stack.pop().?;
        var left: i32 = vm.stack.pop().?;

        try vm.stack.push(left - right);
    }
    inline fn product(vm: *Vm) !void {
        var right: i32 = vm.stack.pop().?;
        var left: i32 = vm.stack.pop().?;

        try vm.stack.push(left * right);
    }
    inline fn quotient(vm: *Vm) !void {
        var right: i32 = vm.stack.pop().?;
        var left: i32 = vm.stack.pop().?;

        try vm.stack.push(@divTrunc(left, right));
    }
    inline fn clone(vm: *Vm) !void {
        try vm.stack.push(vm.stack.top().?);
    }
    inline fn notFound(vm: *Vm) !void {
        try vm.out.print("{s}\n", .{"Word not found."});
    }
    inline fn bye(_: *Vm) !void {
        std.process.exit(0);
    }
    inline fn @"."(vm: *Vm) !void {
        try vm.out.print("{d}\n", .{vm.stack.top()});
    }
};

inline fn shellLoop(stdin: std.fs.File.Reader, stdout: std.fs.File.Writer) !void {
    const max_input = 1024;
    var input_buffer: [max_input]u8 = undefined;
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};

    var stack = Stack(i32).init(gpa.allocator());
    defer stack.deinit();

    var env: std.StringHashMap(std.ArrayList(Token)) = std.StringHashMap(std.ArrayList(Token)).init(gpa.allocator());
    defer env.deinit();
    // var sumRef: std.ArrayList(Token) = std.ArrayList(Token).init(gpa.allocator());
    // defer sumRef.deinit();
    // try sumRef.append(Token.sum);
    // try env.put("+", sumRef);
    // try env.put("-", Token.difference);
    // try env.put("*", Token.product);
    // try env.put("/", Token.quotient);

    var vm = Vm{
        .stack = stack,
        .in = stdin,
        .out = stdout,
    };

    while (true) {
        try stdout.print("> ", .{});

        var input_str = (try stdin.readUntilDelimiterOrEof(input_buffer[0..], '\n')) orelse {
            try stdout.print("\n", .{});
            return;
        };

        if (input_str.len == 0) continue;
        var words = std.mem.tokenize(u8, input_str, " ");

        outer: while (words.next()) |word| {
            if (std.mem.eql(u8, word, "info")) {
                std.log.info("{}", .{env.get(words.next().?)});
                continue;
            }

            if (std.mem.eql(u8, word, ":")) {
                var list: std.ArrayList(Token) = std.ArrayList(Token).init(gpa.allocator());
                defer list.deinit();
                var alias = words.next().?;

                while (words.next()) |defWord| {
                    if (std.mem.eql(u8, defWord, ";")) {
                        // std.debug.print("alias {s} : {s}", .{ alias, list });
                        try env.put(alias, list);
                        std.debug.print("inserted? {s}", .{env.get(alias)});
                        continue :outer;
                    }

                    try list.append(findToken(defWord) orelse Token.notFound);
                }

                continue :outer;
            }

            const num = std.fmt.parseInt(i32, word, 10) catch {
                if (findToken(word)) |token| {
                    std.debug.print("found token", .{});
                    execToken(&vm, token);
                    continue;
                } else if (env.get(word)) |tokens| {
                    std.debug.print("got def", .{});
                    for (tokens.items) |token| {
                        execToken(&vm, token);
                    }
                    continue;
                } else {
                    std.debug.print("sad", .{});
                    execToken(&vm, Token.notFound);
                    continue;
                }
            };

            try vm.stack.push(num);
        }
        // std.log.info("{}", .{vm.stack});
    }
}

inline fn findToken(word: []const u8) ?Token {
    inline for (@typeInfo(Token).Enum.fields) |enField| {
        if (std.mem.eql(u8, enField.name, word))
            return @field(Token, enField.name);
    }
    return null;
}

inline fn execToken(vm: *Vm, tok: Token) void {
    inline for (@typeInfo(Token).Enum.fields) |enField| {
        const enumValue = @field(Token, enField.name);
        if (enumValue == tok) {
            const empty = .{};
            _ = @call(empty, @field(Ops, @tagName(enumValue)), .{vm}) catch unreachable;
        }
    }
}

const Token = GenerateTokenEnumType(Ops);

fn GenerateTokenEnumType(comptime T: type) type {
    const fieldInfos = std.meta.declarations(T);
    var enumDecls: [fieldInfos.len]std.builtin.TypeInfo.EnumField = undefined;
    var decls = [_]std.builtin.TypeInfo.Declaration{};
    inline for (fieldInfos) |field, i| {
        enumDecls[i] = .{ .name = field.name, .value = i };
    }
    return @Type(.{
        .Enum = .{
            .layout = .Auto,
            .tag_type = u8,
            .fields = &enumDecls,
            .decls = &decls,
            .is_exhaustive = true,
        },
    });
}

pub fn main() !u8 {
    const stdin = std.io.getStdIn().reader();
    const stdout = std.io.getStdOut().writer();
    try stdout.print("*** Hello, I am a Forth shell! ***\n", .{});

    try shellLoop(stdin, stdout);

    return 0;
}

const ArrayList = std.ArrayList;
const Allocator = std.mem.Allocator;

pub fn Stack(comptime T: type) type {
    return struct {
        stack: ArrayList(T),

        const Self = @This();

        pub fn init(allocator: Allocator) Self {
            return Self{ .stack = ArrayList(T).init(allocator) };
        }

        pub fn deinit(self: *Self) void {
            self.stack.deinit();
        }

        pub fn push(self: *Self, val: T) !void {
            try self.stack.append(val);
        }

        pub fn pop(self: *Self) ?T {
            return self.stack.popOrNull();
        }

        pub fn top(self: *Self) ?T {
            if (self.stack.items.len == 0) {
                return null;
            }
            return self.stack.items[self.stack.items.len - 1];
        }

        pub fn count(self: *Self) usize {
            return self.stack.items.len;
        }

        pub fn isEmpty(self: *Self) bool {
            return self.count() == 0;
        }
    };
}
