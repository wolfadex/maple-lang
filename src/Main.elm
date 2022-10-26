module Main exposing (main)

import Browser
import Element exposing (..)
import Element.Input as Input
import Extra.Result
import Html
import Maple exposing (Expr)
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
    { editor : Maple.Editor.Model
    , output : Result String (List Expr)
    }


init : () -> ( Model, Cmd Msg )
init () =
    let
        ( editor, editorCmd ) =
            Maple.Editor.init
    in
    ( { editor = editor
      , output = Ok []
      }
    , Cmd.map EditorMsg editorCmd
    )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


type Msg
    = NoOp
    | EditorMsg Maple.Editor.Msg
    | ExecuteCode


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        EditorMsg editorMsg ->
            let
                ( editor, editorCmd ) =
                    Maple.Editor.update editorMsg model.editor
            in
            ( { model | editor = editor }
            , Cmd.map EditorMsg editorCmd
            )

        ExecuteCode ->
            ( { model
                | output =
                    model.editor
                        |> Maple.Editor.tokens
                        |> Maple.parseFromTokens
              }
            , Cmd.none
            )


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
        [ padding 16
        , spacing 16
        , width fill
        ]
        [ text "Maple Lang"
        , Maple.Editor.view model.editor
            |> Html.map EditorMsg
            |> html
            |> el [ width fill ]
        , Input.button
            []
            { label = text "Run"
            , onPress = Just ExecuteCode
            }
        , text (Debug.toString model.output)
        ]
