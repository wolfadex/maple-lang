module Maple.Editor exposing (..)

import Array exposing (Array)
import Browser.Dom
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Json.Decode exposing (Decoder)
import Task
import Zipper exposing (Modification(..), Zipper)


type alias Model =
    { source : Zipper Token
    }


type alias Line =
    Array Token


type Token
    = Hole String
    | Number String (Result String Float)


init : ( Model, Cmd Msg )
init =
    ( { source =
            Hole ""
                |> Zipper.singleton
      }
    , Browser.Dom.focus "maple-editor"
        |> Task.attempt (\_ -> NoOp)
    )


type Msg
    = NoOp
    | GotInput String
    | FocusEditor
    | Move Direction


type Direction
    = Left
    | Right


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        FocusEditor ->
            ( model
            , Browser.Dom.focus "maple-editor"
                |> Task.attempt (\_ -> NoOp)
            )

        Move Right ->
            ( { model
                | source =
                    Zipper.cursorNext
                        (\cursor token ->
                            case token of
                                Hole str ->
                                    if cursor < String.length str then
                                        Just (cursor + 1)

                                    else
                                        Nothing

                                Number raw _ ->
                                    Nothing
                        )
                        model.source
              }
            , Cmd.none
            )

        Move Left ->
            ( { model
                | source =
                    Zipper.cursorPrevious
                        tokenEnd
                        (\cursor token ->
                            case token of
                                Hole str ->
                                    if cursor > 0 then
                                        Just (cursor - 1)

                                    else
                                        Nothing

                                Number raw _ ->
                                    Nothing
                        )
                        model.source
              }
            , Cmd.none
            )

        GotInput str ->
            ( { model
                | source =
                    Zipper.modify
                        tokenEnd
                        (\cursor token ->
                            case token of
                                Hole prevStr ->
                                    if str == " " then
                                        Insert
                                            (case String.toFloat prevStr of
                                                Nothing ->
                                                    Hole prevStr

                                                Just f ->
                                                    Number prevStr (Ok f)
                                            )
                                            (Hole "")
                                            []

                                    else
                                        let
                                            before =
                                                String.slice 0 cursor prevStr

                                            after =
                                                String.slice cursor (String.length prevStr) prevStr
                                        in
                                        Change (cursor + 1) (Hole (before ++ str ++ after))

                                Number raw fRes ->
                                    Change cursor (Number raw fRes)
                        )
                        model.source
                        |> Maybe.withDefault (Zipper.singleton (Hole ""))
              }
            , Cmd.none
            )


tokenEnd : Token -> Int
tokenEnd token =
    case token of
        Hole str ->
            String.length str

        Number raw _ ->
            String.length raw


view : Model -> Html Msg
view model =
    Html.div
        [ Html.Events.onClick FocusEditor ]
        [ Html.textarea
            [ Html.Events.custom "input" decodeInput
            , Html.Events.custom "keydown" decodeKeyDown
            , Html.Attributes.contenteditable True
            , Html.Attributes.id "maple-editor"
            , Html.Attributes.value ""
            ]
            []
        , model.source
            |> Zipper.foldr
                (\maybeCursor token renderedTokens ->
                    viewToken maybeCursor token :: renderedTokens
                )
                []
            |> Html.div [ Html.Attributes.class "editor" ]
        ]


decodeKeyDown : Decoder { message : Msg, preventDefault : Bool, stopPropagation : Bool }
decodeKeyDown =
    Json.Decode.field "key" Json.Decode.string
        |> Json.Decode.andThen
            (\key ->
                case key of
                    "ArrowRight" ->
                        Json.Decode.succeed Right

                    "ArrowLeft" ->
                        Json.Decode.succeed Left

                    _ ->
                        Json.Decode.fail (Debug.log "key?" key)
            )
        |> Json.Decode.map
            (\dir ->
                { message = Move dir
                , preventDefault = True
                , stopPropagation = True
                }
            )


decodeInput : Decoder { message : Msg, preventDefault : Bool, stopPropagation : Bool }
decodeInput =
    Json.Decode.map
        (\data ->
            { message = GotInput data
            , preventDefault = True
            , stopPropagation = True
            }
        )
        (Json.Decode.field "data" Json.Decode.string)


viewToken : Maybe Int -> Token -> Html Msg
viewToken maybeCursor token =
    case token of
        Hole str ->
            Html.span
                [ Html.Attributes.class "token hole" ]
                (case Debug.log "curs?" maybeCursor of
                    Nothing ->
                        [ Html.text str ]

                    Just cursor ->
                        [ Html.text (String.slice 0 cursor str)
                        , Html.div [ Html.Attributes.class "cursor" ] []
                        , Html.text (String.slice cursor (String.length str) str)
                        ]
                )

        Number raw _ ->
            Html.span
                [ Html.Attributes.class "token number" ]
                (case maybeCursor of
                    Nothing ->
                        [ Html.text raw ]

                    Just cursor ->
                        [ Html.text (String.slice 0 cursor raw)
                        , Html.div [ Html.Attributes.class "cursor" ] []
                        , Html.text (String.slice cursor (String.length raw) raw)
                        ]
                )
