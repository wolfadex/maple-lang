module Maple.Precursor exposing (..)

import AssocList
import Extra.List
import Parser.Advanced exposing ((|.), (|=), Step(..))



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
    , body : String
    }


type Export
    = OpaqueType (Name TypeName)
    | ClearType (Name TypeName)
    | Expression (Name ExpressionName)


type Name a
    = Name String


nameToString : Name a -> String
nameToString (Name str) =
    str


type TypeName
    = TypeName Never


type ConstructorName
    = ConstructorName Never


type ExpressionName
    = ExpressionName Never



---- PARSING ----


type Error
    = Error


type alias Parser a =
    Parser.Advanced.Parser Context MapleProblem a


type Context
    = EntryModule String
    | DependencyModule String


type MapleProblem
    = MapleProblem
    | InvalidModuleName InvalidModuleName
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
    | ExpectedLineComment
    | ExpectedMultilineCommentStart
    | ExpectedMultilineCommentEnd
    | GatheringRest
    | ExpectedEndOfFile


type InvalidModuleName
    = EmptyModuleName
    | ModuleNameInvalidFirstChar Char
    | ModuleNameInvalidBodyChar Char


parseEntry : String -> String -> Result String MapleProgram
parseEntry entryModuleName input =
    case Parser.Advanced.run (parseEntryHelper entryModuleName) input of
        Err err ->
            Err (Debug.toString err)

        Ok prog ->
            Ok prog


parseEntryHelper : String -> Parser MapleProgram
parseEntryHelper entryModuleName =
    Parser.Advanced.succeed
        (\entryModule module_ -> { modules = AssocList.singleton entryModule module_, entryModule = entryModule })
        |= (case parseModuleName entryModuleName of
                Err err ->
                    Parser.Advanced.problem err

                Ok name ->
                    Parser.Advanced.succeed name
           )
        |. parseSpacesOrComments
        |= parseModule
        |> Parser.Advanced.inContext (EntryModule entryModuleName)


parseDependency : ModuleName -> MapleProgram -> String -> Result String MapleProgram
parseDependency moduleName baseProgram input =
    case Parser.Advanced.run (parseDependencyHelper moduleName baseProgram) input of
        Err err ->
            Err (Debug.toString err)

        Ok prog ->
            Ok prog


parseDependencyHelper : ModuleName -> MapleProgram -> Parser MapleProgram
parseDependencyHelper moduleName baseProgram =
    Parser.Advanced.succeed
        (\module_ ->
            { baseProgram
                | modules = AssocList.insert moduleName module_ baseProgram.modules
            }
        )
        |. parseSpacesOrComments
        |= parseModule
        |> Parser.Advanced.inContext (DependencyModule (String.join "." moduleName))


parseModule : Parser Module
parseModule =
    Parser.Advanced.succeed Module
        |= parseExports
        |. parseSpacesOrComments
        |= parseImports
        |= gatherRest


gatherRest : Parser String
gatherRest =
    Parser.Advanced.loop ( "", 0 ) ifProgressGather


ifProgressGather : ( String, Int ) -> Parser (Parser.Advanced.Step ( String, Int ) String)
ifProgressGather ( prevStr, offset ) =
    Parser.Advanced.oneOf
        [ Parser.Advanced.succeed Tuple.pair
            |= (Parser.Advanced.chompIf (\char -> char /= '\u{0000}') GatheringRest
                    |> Parser.Advanced.getChompedString
               )
            |= Parser.Advanced.getOffset
            |> Parser.Advanced.map
                (\( charStr, newOffset ) ->
                    if offset == newOffset then
                        Parser.Advanced.Done (prevStr ++ charStr)

                    else
                        Parser.Advanced.Loop ( prevStr ++ charStr, newOffset )
                )
        , Parser.Advanced.end ExpectedEndOfFile
            |> Parser.Advanced.map (\() -> Parser.Advanced.Done prevStr)
        ]


{-| exports [ main ]
-}
parseExports : Parser (List Export)
parseExports =
    Parser.Advanced.succeed identity
        |. Parser.Advanced.keyword (Parser.Advanced.Token "exports" ExpectedExports)
        |. parseSpacesOrComments
        |= Parser.Advanced.sequence
            { start = Parser.Advanced.Token "[" ExpectedExportStart
            , separator = Parser.Advanced.Token "," ExpectedExportSeparator
            , end = Parser.Advanced.Token "]" ExpectedExportEnd
            , spaces = parseSpacesOrComments
            , item = parseExport
            , trailing = Parser.Advanced.Forbidden
            }
        |. parseSpacesOrComments


parseExport : Parser Export
parseExport =
    Parser.Advanced.oneOf
        [ parseExpressionLabel
            |> Parser.Advanced.map Expression
        , parseTypeLabel
            |> Parser.Advanced.andThen
                (\typeLabel ->
                    Parser.Advanced.oneOf
                        [ Parser.Advanced.succeed (ClearType typeLabel)
                            |. Parser.Advanced.symbol (Parser.Advanced.Token "(..)" ExpectedExposeAll)
                        , Parser.Advanced.succeed (OpaqueType typeLabel)
                        ]
                )
        ]


parseImports : Parser (List ModuleName)
parseImports =
    Parser.Advanced.succeed identity
        |. Parser.Advanced.keyword (Parser.Advanced.Token "imports" ExpectedImports)
        |. parseSpacesOrComments
        |= Parser.Advanced.sequence
            { start = Parser.Advanced.Token "[" ExpectedExportStart
            , separator = Parser.Advanced.Token "," ExpectedImportSeparator
            , end = Parser.Advanced.Token "]" ExpectedImportEnd
            , spaces = parseSpacesOrComments
            , item = parseImport
            , trailing = Parser.Advanced.Forbidden
            }
        |. parseSpacesOrComments


parseImport : Parser ModuleName
parseImport =
    Parser.Advanced.succeed ()
        |. Parser.Advanced.chompWhile (\char -> char /= ',' && char /= ']')
        |> Parser.Advanced.getChompedString
        |> Parser.Advanced.andThen
            (\str ->
                case parseModuleName str of
                    Err err ->
                        Parser.Advanced.problem err

                    Ok name ->
                        Parser.Advanced.succeed name
            )


parseExpressionLabel : Parser (Name ExpressionName)
parseExpressionLabel =
    Parser.Advanced.succeed ()
        |. Parser.Advanced.chompIf (\char -> Char.isAlpha char && Char.isLower char) ExpectedExpressionLabelStart
        |. Parser.Advanced.chompWhile (\char -> Char.isAlphaNum char || char == '_')
        |> Parser.Advanced.getChompedString
        |> Parser.Advanced.map Name


parseTypeLabel : Parser (Name TypeName)
parseTypeLabel =
    Parser.Advanced.succeed ()
        |. Parser.Advanced.chompIf (\char -> Char.isAlpha char && Char.isUpper char) ExpectedTypeLabelStart
        |. Parser.Advanced.chompWhile (\char -> Char.isAlphaNum char || char == '_')
        |> Parser.Advanced.getChompedString
        |> Parser.Advanced.map Name


parseModuleName : String -> Result MapleProblem ModuleName
parseModuleName input =
    case input |> String.trim |> String.split "." of
        [] ->
            Err (InvalidModuleName EmptyModuleName)

        parts ->
            Extra.List.mapOrErr
                (\part ->
                    case String.toList part of
                        [] ->
                            Err (InvalidModuleName EmptyModuleName)

                        firstChar :: restChar ->
                            if Char.isAlpha firstChar && Char.isUpper firstChar then
                                case
                                    Extra.List.mapOrErr
                                        (\char ->
                                            if Char.isAlphaNum char || char == '_' then
                                                Ok char

                                            else
                                                Err (InvalidModuleName (ModuleNameInvalidBodyChar char))
                                        )
                                        restChar
                                of
                                    Err err ->
                                        Err err

                                    Ok _ ->
                                        Ok part

                            else
                                Err (InvalidModuleName (ModuleNameInvalidFirstChar firstChar))
                )
                parts


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
