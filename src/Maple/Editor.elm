module Maple.Editor exposing (..)

import Html exposing (Html)
import Html.Events
import Json.Decode exposing (Decoder, Value)


view : { onError : Value -> msg } -> Html msg
view config =
    Html.node "maple-editor"
        [ Html.Events.on "maple-editor-error" (decodeError config.onError) ]
        []


decodeError : (Value -> msg) -> Decoder msg
decodeError onError =
    Json.Decode.map onError
        (Json.Decode.field "detail" Json.Decode.value)
