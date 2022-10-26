module Maple exposing (..)

import Parser exposing ((|.), (|=), Parser, Step(..))
import Pratt


type Expr
    = EFloat Float
    | EFunc String
    | BinaryOp Expr Expr Expr


parse : String -> Result String (List Expr)
parse input =
    case Parser.run parseProgram input of
        Err _ ->
            Err "parse error"

        Ok exprs ->
            Ok exprs


parseProgram : Parser (List Expr)
parseProgram =
    Parser.loop [] parseProgramHelper


parseProgramHelper : List Expr -> Parser (Step (List Expr) (List Expr))
parseProgramHelper reverseExpr =
    Parser.oneOf
        [ Parser.succeed (\expr -> Loop (expr :: reverseExpr))
            |= parseExpr
        , Parser.succeed (Done (List.reverse reverseExpr))
        ]


parseExpr : Parser Expr
parseExpr =
    Pratt.expression
        { oneOf =
            [ Pratt.literal parseFloat
            , Pratt.literal parseFunc
            , Pratt.literal (postfixOperator parseBinaryOp)
            ]
        , andThenOneOf =
            [ Pratt.infixLeft 10
                (Parser.symbol "+")
                (BinaryOp (EFunc "__sum"))
            ]
        , spaces = Parser.spaces
        }


postfixOperator : Parser Expr -> Parser Expr
postfixOperator opParser =
    Parser.succeed identity
        |. Parser.symbol "("
        |= opParser
        |. Parser.symbol ")"
        |> Parser.backtrackable


parseBinaryOp : Parser Expr
parseBinaryOp =
    Parser.succeed EFunc
        |= Parser.oneOf
            [ Parser.symbol "+"
                |> Parser.map (\() -> "__sum")
            , Parser.symbol "-"
                |> Parser.map (\() -> "__difference")
            , Parser.symbol "*"
                |> Parser.map (\() -> "__product")
            , Parser.symbol "/"
                |> Parser.map (\() -> "__quotient")
            ]


parseFloat : Parser Expr
parseFloat =
    Parser.succeed EFloat
        |= Parser.float


parseFunc : Parser Expr
parseFunc =
    Parser.succeed ()
        |. Parser.chompIf (\char -> (Char.isAlpha char && Char.isLower char) || char == '.')
        |. Parser.chompWhile (\char -> Char.isAlphaNum char || char == '_')
        |> Parser.getChompedString
        |> Parser.map EFunc


typeCheck : List Expr -> Result String (List Expr)
typeCheck typedExprs =
    typeCheckHelper 0 [] typedExprs


typeCheckHelper : Int -> List Expr -> List Expr -> Result String (List Expr)
typeCheckHelper stackSize result typedExprs =
    case typedExprs of
        [] ->
            Ok (List.reverse result)

        next :: rest ->
            let
                diff =
                    stackSize - next.input
            in
            if diff < 0 then
                Err "uses more stack than is available"

            else
                typeCheckHelper (diff + next.output) (next.expr :: result) rest


run : List Expr -> Result String (List Expr)
run exprs =
    runHelper [] exprs


runHelper : List Expr -> List Expr -> Result String (List Expr)
runHelper env toRun =
    case toRun of
        [] ->
            Ok env

        next :: rest ->
            case next of
                EFloat _ ->
                    runHelper (next :: env) rest

                BinaryOp op left right ->
                    Debug.todo ""

                EFunc func ->
                    case func of
                        "__sum" ->
                            case apply env (+) of
                                Err err ->
                                    Err err

                                Ok newEnv ->
                                    runHelper newEnv rest

                        "__difference" ->
                            case apply env (-) of
                                Err err ->
                                    Err err

                                Ok newEnv ->
                                    runHelper newEnv rest

                        "__product" ->
                            case apply env (*) of
                                Err err ->
                                    Err err

                                Ok newEnv ->
                                    runHelper newEnv rest

                        "__quotient" ->
                            case apply env (/) of
                                Err err ->
                                    Err err

                                Ok newEnv ->
                                    runHelper newEnv rest

                        fn ->
                            Err ("Unknown function: " ++ fn)


apply : List Expr -> (Float -> Float -> Float) -> Result String (List Expr)
apply env op =
    case env of
        (EFloat right) :: (EFloat left) :: rest ->
            Ok (EFloat (op left right) :: rest)

        _ ->
            Err "wrong arg count or wrong type"



-- type Token
--     =
-- parseFromTokens :
