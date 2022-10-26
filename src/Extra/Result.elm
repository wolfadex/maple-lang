module Extra.Result exposing (..)


fromList : List (Result e a) -> Result e (List a)
fromList listResults =
    fromListHelper listResults []


fromListHelper : List (Result e a) -> List a -> Result e (List a)
fromListHelper input output =
    case input of
        [] ->
            Ok (List.reverse output)

        (Err err) :: _ ->
            Err err

        (Ok a) :: rest ->
            fromListHelper rest (a :: output)
