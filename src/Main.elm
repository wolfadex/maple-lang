module Main exposing (main)

import Browser
import Element exposing (..)
import Json.Encode exposing (Value)
import Maple.Editor


main : Program () Model Msg
main =
    Browser.document
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


type alias Model =
    {}


init : () -> ( Model, Cmd Msg )
init () =
    ( {}, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


type Msg
    = NoOp
    | EditorError Value


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        EditorError error ->
            let
                _ =
                    Debug.log "got editor error" error
            in
            ( model, Cmd.none )


view : Model -> Browser.Document Msg
view model =
    { title = "Maple Lang"
    , body =
        [ layout [] (viewModel model)
        ]
    }


viewModel : Model -> Element Msg
viewModel model =
    column
        [ padding 16 ]
        [ text "Maple Lang"
        , Maple.Editor.view
            { onError = EditorError
            }
            |> html
            |> el []
        ]
