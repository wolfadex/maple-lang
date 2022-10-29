SRC = src/
DIST = dist/
OB = as -o
L1 = ld -macosx_version_min 11.0.0 -o
L2 = -lSystem -syslibroot `xcrun -sdk macosx --show-sdk-path` -e _start -arch arm64


hello: $(SRC)hello_world.s
	$(OB) $(DIST)hello_world.o $(SRC)hello_world.s
	$(L1) $(DIST)hello_world $(DIST)hello_world.o $(L2)


comp: $(SRC)comp.s maple_lang_core.s
	$(OB) $(DIST)comp.o $(SRC)comp.s
	$(L1) $(DIST)comp $(DIST)comp.o $(L2)