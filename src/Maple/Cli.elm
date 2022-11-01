module Maple.Cli exposing (..)

-- import Maple

import AssocList
import Maple.Precursor
import Maple.Unofficial
import Posix.IO as IO exposing (IO, Process)
import Posix.IO.File as File
import Posix.IO.Process as Process


program : Process -> IO ()
program process =
    case process.argv of
        [ _, srcDirectory, entryFileName ] ->
            let
                _ =
                    Debug.log ""
            in
            getPrecursorData srcDirectory entryFileName
                |> IO.map Maple.Unofficial.parse
                |> IO.exitOnError identity
                -- |> IO.map Maple.typeCheck
                -- |> IO.exitOnError identity
                -- |> IO.map Maple.run
                -- |> IO.exitOnError identity
                |> IO.andThen
                    (\content ->
                        Process.print (Debug.toString content)
                    )

        _ ->
            Process.logErr "Usage: maple file\n"


getPrecursorData : String -> String -> IO Maple.Precursor.MapleProgram
getPrecursorData srcDirectory entryFileName =
    File.contentsOf (srcDirectory ++ "/" ++ entryFileName)
        |> IO.exitOnError identity
        |> IO.map (Maple.Precursor.parseEntry (stripFileType entryFileName))
        |> IO.exitOnError identity
        |> IO.andThen
            (\programSoFar ->
                let
                    modulesToGather : List Maple.Precursor.ModuleName
                    modulesToGather =
                        case AssocList.get programSoFar.entryModule programSoFar.modules of
                            Nothing ->
                                []

                            Just module_ ->
                                module_.imports
                in
                gatherAdditionalModules srcDirectory modulesToGather programSoFar
            )


gatherAdditionalModules : String -> List Maple.Precursor.ModuleName -> Maple.Precursor.MapleProgram -> IO Maple.Precursor.MapleProgram
gatherAdditionalModules srcDirectory modulesToGather programSoFar =
    case modulesToGather of
        [] ->
            IO.return programSoFar

        nextModule :: restModules ->
            case AssocList.get nextModule programSoFar.modules of
                Just _ ->
                    gatherAdditionalModules srcDirectory restModules programSoFar

                Nothing ->
                    File.contentsOf (srcDirectory ++ "/" ++ String.join "." nextModule ++ ".map")
                        |> IO.exitOnError identity
                        |> IO.map (Maple.Precursor.parseDependency nextModule programSoFar)
                        |> IO.exitOnError identity
                        |> IO.andThen
                            (\nextProgram ->
                                gatherAdditionalModules
                                    srcDirectory
                                    restModules
                                    nextProgram
                            )


stripFileType : String -> String
stripFileType fileName =
    fileName
        |> String.split "."
        |> List.reverse
        |> List.drop 1
        |> List.reverse
        |> String.join "."
