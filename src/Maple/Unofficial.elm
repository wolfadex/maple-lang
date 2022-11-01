module Maple.Unofficial exposing (..)

import AssocList
import Maple.Precursor
import Parser.Advanced exposing ((|.), (|=))
import Pratt.Advanced



---- TYPES ----


type alias MapleProgram =
    { modules : AssocList.Dict ModuleName Module
    , entryModule : ModuleName
    }


type alias ModuleName =
    List String


type alias Module =
    { exports : List Export
    , imports : List ModuleName
    , typeDefinitions : List ( Name TypeName, TypeDefinition )
    , expressionDefinitions : List ( Name ExpressionName, ExpressionDefinition )
    }


type Export
    = OpaqueType (Name TypeName)
    | ClearType (Name TypeName)
    | Expression (Name ExpressionName)


type Name a
    = Name String


type TypeName
    = TypeName Never


type alias TypeDefinition =
    { typeVariables : List String
    , constructors : List TypeConstructor
    }


type ConstructorName
    = ConstructorName Never


type alias TypeConstructor =
    { name : Name ConstructorName
    , arguments : List ConcreteOrVariableType
    }


type ConcreteOrVariableType
    = CTConcreteType TypeConstructor
    | CTVariableType String


type ExpressionName
    = ExpressionName Never


type alias ExpressionDefinition =
    { type_ : Maybe Type
    , expression : Expr
    }


type Type
    = TFloat
    | TInt
    | TString
    | TCustom String
    | TEffect String
    | TFunction (List Type) (List Type)
    | TOneOf (List Type)
    | TVariable String


type Expr
    = EFloat Float
    | EInt Int
    | EFuncApplication (Name ExpressionName)
    | ETypeConstructorApplication (Name TypeConstructor)
    | BinaryOp Expr Expr Expr
    | EString String
    | EIf Expr Expr Expr
    | EList (List Expr)



---- PARSING ----


type Error
    = Error


type alias Parser a =
    Parser.Advanced.Parser Context MapleProblem a


type Context
    = Program


type MapleProblem
    = UnexpectedCannotFindModule
    | ExpectedLineComment
    | ExpectedMultilineCommentStart
    | ExpectedMultilineCommentEnd
    | ExpectingSemiColon
    | ExpectingOpeningParen
    | ExpectingClosingParen
    | ExpectingComma
      --
    | ExpectedExports
    | ExpectedImports
    | ExpectedExportStart
    | ExpectedExportSeparator
    | ExpectedExportEnd
    | ExpectedImportStart
    | ExpectedImportSeparator
    | ExpectedImportEnd
    | ExpectedExposeAll
    | ExpectedExpressionLabelStart
    | ExpectedTypeLabelStart
    | GatheringRest
    | ExpectedEndOfFile
    | ExpectingLowerAlphaChar
    | ExpectingUpperAlphaChar
    | TypeConstructorDefinitionMustBeIndented
    | ExpectingFloat
    | InvalidNumber
    | ExpectingStringStart
    | ExpectingStringEnd
    | ExpectingDoubleQuoteEscape


parse : Maple.Precursor.MapleProgram -> Result String MapleProgram
parse precursorProgram =
    AssocList.foldl
        (\moduleName precursorModule result ->
            case result of
                Err err ->
                    Err err

                Ok unofficialProgram ->
                    case Parser.Advanced.run (parseModule precursorModule) precursorModule.body of
                        Err _ ->
                            Err "err"

                        Ok module_ ->
                            Ok
                                { unofficialProgram
                                    | modules =
                                        AssocList.insert moduleName module_ unofficialProgram.modules
                                }
        )
        (Ok
            { modules = AssocList.empty
            , entryModule = precursorProgram.entryModule
            }
        )
        precursorProgram.modules


parseModule : Maple.Precursor.Module -> Parser Module
parseModule precursorModule =
    Parser.Advanced.succeed
        (\( typeDefinitions, expressionDefinitions ) ->
            { exports =
                List.map
                    (\export ->
                        case export of
                            Maple.Precursor.OpaqueType name ->
                                OpaqueType (Name (Maple.Precursor.nameToString name))

                            Maple.Precursor.ClearType name ->
                                ClearType (Name (Maple.Precursor.nameToString name))

                            Maple.Precursor.Expression name ->
                                Expression (Name (Maple.Precursor.nameToString name))
                    )
                    precursorModule.exports
            , imports = precursorModule.imports
            , typeDefinitions = typeDefinitions
            , expressionDefinitions = expressionDefinitions
            }
        )
        |. parseSpacesOrComments
        |= parseBody


parseBody : Parser TypeAndExprDefs
parseBody =
    Parser.Advanced.loop ( [], [] ) parseBodyHelper


type alias TypeAndExprDefs =
    ( List ( Name TypeName, TypeDefinition )
    , List ( Name ExpressionName, ExpressionDefinition )
    )


parseBodyHelper : TypeAndExprDefs -> Parser (Parser.Advanced.Step TypeAndExprDefs TypeAndExprDefs)
parseBodyHelper ( typeDefs, exprDefs ) =
    Parser.Advanced.oneOf
        [ Parser.Advanced.succeed (\typeDef -> Parser.Advanced.Loop ( typeDef :: typeDefs, exprDefs ))
            |= parseTypeDef
        , Parser.Advanced.succeed (\exprDef -> Parser.Advanced.Loop ( typeDefs, exprDef :: exprDefs ))
            |= parseExprDef
        , Parser.Advanced.succeed
            (Parser.Advanced.Done ( typeDefs, exprDefs ))
        ]


parseTypeDef : Parser ( Name TypeName, TypeDefinition )
parseTypeDef =
    Parser.Advanced.succeed Tuple.pair
        |= parseTypeName
        |. parseSpacesOrComments
        |= parseTypeDefinition
        |. parseSpacesOrComments


parseTypeName : Parser (Name TypeName)
parseTypeName =
    Parser.Advanced.succeed ()
        |. Parser.Advanced.chompIf (\char -> Char.isAlpha char && Char.isUpper char) ExpectingUpperAlphaChar
        |. Parser.Advanced.chompWhile (\char -> Char.isAlphaNum char)
        |> Parser.Advanced.getChompedString
        |> Parser.Advanced.map Name


parseTypeDefinition : Parser TypeDefinition
parseTypeDefinition =
    Parser.Advanced.succeed TypeDefinition
        |= parseTypeVariables
        |. parseSpacesOrComments
        |. Parser.Advanced.symbol (Parser.Advanced.Token ":" ExpectingSemiColon)
        |. parseSpacesOrComments
        |= parseTypeConstructors
        |. parseSpacesOrComments


parseTypeVariables : Parser (List String)
parseTypeVariables =
    Parser.Advanced.sequence
        { start = Parser.Advanced.Token "(" ExpectingOpeningParen
        , separator = Parser.Advanced.Token "," ExpectingComma
        , end = Parser.Advanced.Token ")" ExpectingClosingParen
        , spaces = parseSpacesOrComments
        , item = parseTypeVariable
        , trailing = Parser.Advanced.Forbidden
        }


parseTypeVariable : Parser String
parseTypeVariable =
    Parser.Advanced.succeed ()
        |. Parser.Advanced.chompIf (\char -> Char.isAlpha char && Char.isLower char) ExpectingLowerAlphaChar
        |. Parser.Advanced.chompWhile (\char -> Char.isAlphaNum char)
        |> Parser.Advanced.getChompedString


parseTypeConstructors : Parser (List TypeConstructor)
parseTypeConstructors =
    Parser.Advanced.loop [] parseTypeConstructorsHelper


parseTypeConstructorsHelper : List TypeConstructor -> Parser (Parser.Advanced.Step (List TypeConstructor) (List TypeConstructor))
parseTypeConstructorsHelper typeCons =
    Parser.Advanced.oneOf
        [ Parser.Advanced.succeed (\typeCon -> Parser.Advanced.Loop (typeCon :: typeCons))
            |= parseTypeConstructor
            |. parseSpacesOrComments
        , Parser.Advanced.succeed (Parser.Advanced.Done typeCons)
        ]


parseTypeConstructor : Parser TypeConstructor
parseTypeConstructor =
    Parser.Advanced.getCol
        |> Parser.Advanced.andThen
            (\column ->
                if column > 2 then
                    parseTypeConstructorInline

                else
                    Parser.Advanced.problem TypeConstructorDefinitionMustBeIndented
            )


parseTypeConstructorInline : Parser TypeConstructor
parseTypeConstructorInline =
    Parser.Advanced.succeed TypeConstructor
        |= (Parser.Advanced.succeed ()
                |. Parser.Advanced.chompIf (\char -> Char.isAlpha char && Char.isUpper char) ExpectingUpperAlphaChar
                |. Parser.Advanced.chompWhile (\char -> Char.isAlphaNum char)
                |> Parser.Advanced.getChompedString
                |> Parser.Advanced.map Name
           )
        |. parseSpacesOrComments
        |= Parser.Advanced.sequence
            { start = Parser.Advanced.Token "(" ExpectingOpeningParen
            , separator = Parser.Advanced.Token "," ExpectingComma
            , end = Parser.Advanced.Token ")" ExpectingClosingParen
            , spaces = parseSpacesOrComments
            , item =
                Parser.Advanced.oneOf
                    [ parseTypeVariable
                        |> Parser.Advanced.map CTVariableType
                    , Parser.Advanced.lazy (\() -> Parser.Advanced.map CTConcreteType parseTypeConstructorInline)
                    ]
            , trailing = Parser.Advanced.Forbidden
            }


parseExprDef : Parser ( Name ExpressionName, ExpressionDefinition )
parseExprDef =
    -- main (+IO):
    --     #| A doc comment for a definition goes right after the definition label |#
    --     "Hello, Maple!" print_ln
    --
    -- print_ln (String -> +IO):
    --     #| Prints a String to the terminal, ending it with a `\n` |#
    --     INTERNAL
    Parser.Advanced.succeed Tuple.pair
        |= parseExprName
        |. parseSpacesOrComments
        |= parseExprDefinition
        |. parseSpacesOrComments


parseExprName : Parser (Name ExpressionName)
parseExprName =
    Parser.Advanced.succeed ()
        |. Parser.Advanced.chompIf (\char -> Char.isAlpha char && Char.isLower char) ExpectingLowerAlphaChar
        |. Parser.Advanced.chompWhile (\char -> Char.isAlphaNum char)
        |> Parser.Advanced.getChompedString
        |> Parser.Advanced.map Name


parseExprDefinition =
    Parser.Advanced.succeed ExpressionDefinition
        |= parseExprType
        |. parseSpacesOrComments
        |. Parser.Advanced.symbol (Parser.Advanced.Token ":" ExpectingSemiColon)
        |= parseExpr
        |. parseSpacesOrComments


parseExprType : Parser (Maybe Type)
parseExprType =
    -- = TFloat
    -- | TInt
    -- | TString
    -- | TCustom String
    -- | TEffect String
    -- | TFunction (List Type) (List Type)
    -- | TOneOf (List Type)
    -- | TVariable String
    Pratt.Advanced.expression
        { oneOf = []
        , andThenOneOf = []
        , spaces = parseSpacesOrComments
        }


parseExpr : Parser Expr
parseExpr =
    Pratt.Advanced.expression
        -- = EFloat Float
        -- | EInt Int
        -- | EFuncApplication (Name ExpressionName)
        -- | ETypeConstructorApplication (Name TypeConstructor)
        -- | BinaryOp Expr Expr Expr
        -- | EString String
        -- | EIf Expr Expr Expr
        -- | EList (List Expr)
        { oneOf =
            [ Pratt.Advanced.literal parseFloat
            , Pratt.Advanced.literal parseString

            -- , Pratt.Advanced.literal parseFunc
            -- , Pratt.Advanced.literal (postfixOperator parseBinaryOp)
            ]
        , andThenOneOf =
            -- [ Pratt.Advanced.infixLeft 10
            --     (Parser.Advanced.symbol "+")
            --     (BinaryOp (EFuncApplication "__sum"))
            -- ]
            []
        , spaces = Parser.Advanced.spaces
        }



-- postfixOperator : Parser Expr -> Parser Expr
-- postfixOperator opParser =
--     Parser.Advanced.succeed identity
--         |. Parser.Advanced.symbol "("
--         |= opParser
--         |. Parser.Advanced.symbol ")"
--         |> Parser.Advanced.backtrackable
-- parseBinaryOp : Parser Expr
-- parseBinaryOp =
--     Parser.Advanced.succeed EFuncApplication
--         |= Parser.Advanced.oneOf
--             [ Parser.Advanced.symbol "+"
--                 |> Parser.Advanced.map (\() -> "__sum")
--             , Parser.Advanced.symbol "-"
--                 |> Parser.Advanced.map (\() -> "__difference")
--             , Parser.Advanced.symbol "*"
--                 |> Parser.Advanced.map (\() -> "__product")
--             , Parser.Advanced.symbol "/"
--                 |> Parser.Advanced.map (\() -> "__quotient")
--             ]


parseFloat : Parser Expr
parseFloat =
    Parser.Advanced.succeed EFloat
        |= Parser.Advanced.float ExpectingFloat InvalidNumber


parseString : Parser Expr
parseString =
    Parser.Advanced.succeed EString
        |. Parser.Advanced.symbol (Parser.Advanced.Token "\"" ExpectingStringStart)
        |= Parser.Advanced.loop [] parseStringHelper


parseStringHelper : List String -> Parser (Parser.Advanced.Step (List String) String)
parseStringHelper str =
    Parser.Advanced.oneOf
        [ Parser.Advanced.succeed (Parser.Advanced.Loop ("\\\"" :: str))
            |. Parser.Advanced.symbol (Parser.Advanced.Token "\\\"" ExpectingDoubleQuoteEscape)
        , Parser.Advanced.succeed (\charStr -> Parser.Advanced.Loop (charStr :: str))
            |= (Parser.Advanced.succeed ()
                    |. Parser.Advanced.chompWhile (\char -> char /= '\\' && char /= '"')
                    |> Parser.Advanced.getChompedString
               )
        , Parser.Advanced.succeed (Parser.Advanced.Done (str |> List.reverse |> String.concat))
            |. Parser.Advanced.symbol (Parser.Advanced.Token "\"" ExpectingStringEnd)
        ]



-- parseFunc : Parser Expr
-- parseFunc =
--     Parser.Advanced.succeed ()
--         |. Parser.Advanced.chompIf (\char -> (Char.isAlpha char && Char.isLower char) || char == '.')
--         |. Parser.Advanced.chompWhile (\char -> Char.isAlphaNum char || char == '_')
--         |> Parser.Advanced.getChompedString
--         |> Parser.Advanced.map EFuncApplication
-- ---- TYPE CHECKING ----
-- typeCheck : List Expr -> Result String (List Expr)
-- typeCheck typedExprs =
--     typeCheckHelper 0 [] typedExprs
-- typeCheckHelper : Int -> List Expr -> List Expr -> Result String (List Expr)
-- typeCheckHelper stackSize result typedExprs =
--     case typedExprs of
--         [] ->
--             Ok (List.reverse result)
--         next :: rest ->
--             let
--                 diff =
--                     stackSize - next.input
--             in
--             if diff < 0 then
--                 Err "uses more stack than is available"
--             else
--                 typeCheckHelper (diff + next.output) (next.expr :: result) rest


parseSpacesOrComments : Parser ()
parseSpacesOrComments =
    Parser.Advanced.loop 0 <|
        ifProgress <|
            Parser.Advanced.oneOf
                [ Parser.Advanced.lineComment (Parser.Advanced.Token "#" ExpectedLineComment)
                , Parser.Advanced.multiComment
                    (Parser.Advanced.Token "#|" ExpectedMultilineCommentStart)
                    (Parser.Advanced.Token "|#" ExpectedMultilineCommentEnd)
                    Parser.Advanced.Nestable
                , Parser.Advanced.spaces
                ]


ifProgress : Parser a -> Int -> Parser (Parser.Advanced.Step Int ())
ifProgress parser offset =
    Parser.Advanced.succeed identity
        |. parser
        |= Parser.Advanced.getOffset
        |> Parser.Advanced.map
            (\newOffset ->
                if offset == newOffset then
                    Parser.Advanced.Done ()

                else
                    Parser.Advanced.Loop newOffset
            )
