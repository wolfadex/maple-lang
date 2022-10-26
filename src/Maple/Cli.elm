module Maple.Cli exposing (..)

import Maple
import Posix.IO as IO exposing (IO, Process)
import Posix.IO.File as File
import Posix.IO.Process as Process


program : Process -> IO ()
program process =
    case process.argv of
        [ _, filename ] ->
            File.contentsOf filename
                |> IO.exitOnError identity
                |> IO.map Maple.parse
                |> IO.exitOnError identity
                |> IO.map Maple.typeCheck
                |> IO.exitOnError identity
                |> IO.map Maple.run
                |> IO.exitOnError identity
                |> IO.andThen
                    (\content ->
                        Process.print (Debug.toString content)
                    )

        _ ->
            Process.logErr "Usage: maple file\n"
