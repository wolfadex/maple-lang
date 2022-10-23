module Zipper exposing (..)

import Dict exposing (remove)
import Html exposing (a)



-- import Array exposing (Array)


type Zipper a
    = Zipper ( List a, ( Int, a ), List a )


singleton : a -> Zipper a
singleton a =
    Zipper ( [], ( 0, a ), [] )


init : { before : List a, focus : a, after : List a } -> Zipper a
init options =
    Zipper
        ( List.reverse options.before
        , ( 0, options.focus )
        , options.after
        )


foldr : (Maybe Int -> a -> b -> b) -> b -> Zipper a -> b
foldr fn b (Zipper ( before, ( cursor, a ), after )) =
    List.foldl (fn Nothing)
        (fn (Just cursor) a (List.foldr (fn Nothing) b after))
        before



-- update : (a -> a) -> Zipper a -> Zipper a
-- update fn (Zipper ( before, ( cursor, a ), after )) =
--     Zipper ( before, ( cursor, fn a ), after )


type Modification a
    = Change Int a
    | Remove
    | Insert a a (List a)


modify : (a -> Int) -> (Int -> a -> Modification a) -> Zipper a -> Maybe (Zipper a)
modify cursorEnd fn (Zipper ( before, ( oldCursor, oldA ), after )) =
    case fn oldCursor oldA of
        Change cursor a ->
            Just (Zipper ( before, ( cursor, a ), after ))

        Remove ->
            case before of
                [] ->
                    case after of
                        [] ->
                            Nothing

                        a :: rest ->
                            Just (Zipper ( [], ( 0, a ), rest ))

                a :: rest ->
                    Just (Zipper ( rest, ( cursorEnd a, a ), after ))

        Insert b a afterPre ->
            Just (Zipper ( b :: before, ( 0, a ), afterPre ++ after ))


focusNext : Zipper a -> Zipper a
focusNext ((Zipper ( before, ( _, oldA ), after )) as zip) =
    case after of
        [] ->
            zip

        a :: rest ->
            Zipper ( oldA :: before, ( 0, a ), rest )


cursorNext : (Int -> a -> Maybe Int) -> Zipper a -> Zipper a
cursorNext fn ((Zipper ( before, ( oldCursor, oldA ), after )) as zip) =
    case fn oldCursor oldA of
        Just cursor ->
            Zipper ( before, ( cursor, oldA ), after )

        Nothing ->
            case after of
                [] ->
                    zip

                a :: rest ->
                    Zipper ( before, ( 0, a ), rest )


focusPrevious : (a -> Int) -> Zipper a -> Zipper a
focusPrevious cursorEnd ((Zipper ( before, ( _, oldA ), after )) as zip) =
    case before of
        [] ->
            zip

        a :: rest ->
            Zipper ( rest, ( cursorEnd a, a ), oldA :: after )


cursorPrevious : (a -> Int) -> (Int -> a -> Maybe Int) -> Zipper a -> Zipper a
cursorPrevious cursorEnd fn ((Zipper ( before, ( oldCursor, oldA ), after )) as zip) =
    case fn oldCursor oldA of
        Just cursor ->
            Zipper ( before, ( cursor, oldA ), after )

        Nothing ->
            case before of
                [] ->
                    zip

                a :: rest ->
                    Zipper ( rest, ( cursorEnd a, a ), oldA :: after )


focus : Zipper a -> a
focus (Zipper ( _, ( _, a ), _ )) =
    a
