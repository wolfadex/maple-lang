module Maple.Editor exposing (..)

import Array exposing (Array)
import Browser.Dom
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Json.Decode exposing (Decoder)
import Parser exposing ((|.), (|=), Parser)
import Task
import Zipper exposing (Modification(..), Zipper)


type alias Model =
    { source : Zipper Token
    }


type alias Line =
    Array Token


type Token
    = Token String (Maybe String)


tokens : Model -> List String
tokens model =
    Zipper.foldr
        (\_ (Token raw _) result -> raw :: result)
        []
        model.source


init : ( Model, Cmd Msg )
init =
    ( { source =
            Token "" Nothing
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
                        (\cursor (Token raw _) ->
                            if cursor < String.length raw then
                                Just (cursor + 1)

                            else
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
                        (\cursor (Token _ _) ->
                            if cursor > 0 then
                                Just (cursor - 1)

                            else
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
                        (\cursor (Token raw err) ->
                            if str == " " then
                                Insert
                                    (Token raw err)
                                    (Token "" Nothing)
                                    []

                            else
                                let
                                    before : String
                                    before =
                                        String.slice 0 cursor raw

                                    after : String
                                    after =
                                        String.slice cursor (String.length raw) raw
                                in
                                Change (cursor + 1) (Token (before ++ str ++ after) err)
                        )
                        model.source
                        |> Maybe.withDefault (Zipper.singleton (Token "" Nothing))
              }
            , Cmd.none
            )


tokenEnd : Token -> Int
tokenEnd (Token raw _) =
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
viewToken maybeCursor (Token raw err) =
    Html.span
        [ Html.Attributes.classList
            [ ( "token", True )
            , ( "hole", String.isEmpty raw )
            , ( "error"
              , case err of
                    Nothing ->
                        False

                    Just _ ->
                        True
              )
            ]
        ]
        (case maybeCursor of
            Nothing ->
                [ Html.text raw ]

            Just cursor ->
                [ Html.text (String.slice 0 cursor raw)
                , Html.div [ Html.Attributes.class "cursor" ] []
                , Html.text (String.slice cursor (String.length raw) raw)
                ]
        )
