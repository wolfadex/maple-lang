module Extra.List exposing (..)


mapOrErr : (a -> Result e b) -> List a -> Result e (List b)
mapOrErr fn list =
    mapOrErrHelper fn (List.reverse list) []


mapOrErrHelper : (a -> Result e b) -> List a -> List b -> Result e (List b)
mapOrErrHelper fn list result =
    case list of
        [] ->
            Ok result

        next :: rest ->
            case fn next of
                Err err ->
                    Err err

                Ok b ->
                    mapOrErrHelper fn rest (b :: result)
