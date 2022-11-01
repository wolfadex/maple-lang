module Maple.Official exposing (..)

import AssocList


type alias MapleProgram =
    { modules : AssocList.Dict ModuleName Module
    , entryModule : ModuleName
    }


type alias ModuleName =
    List String


type alias Module =
    { exports : List Export
    , imports : List ModuleName
    , typeDefinitions : AssocList.Dict (Name TypeName) TypeDefinition
    , expressionDefinitions : AssocList.Dict (Name ExpressionName) ExpressionDefinition
    }


type Export
    = OpaqueType (Name TypeName)
    | ClearType (Name TypeName)
    | Function (Name ExpressionName)


type Name a
    = Name String


type TypeName
    = TypeName Never


type alias TypeDefinition =
    { typeVariables : List String
    , constructors : List TypeConstructor
    }


type ConstructorName
    = ConstructorName Never


type alias TypeConstructor =
    { name : Name ConstructorName
    , arguments : List ConcreteOrVariableType
    }


type ConcreteOrVariableType
    = ConcreteType (Name TypeName)
    | VariableType String


type ExpressionName
    = ExpressionName Never


type alias ExpressionDefinition =
    Expr


type Expr
    = EFloat Float
    | EInt Int
    | EFuncApplication (Name ExpressionName)
    | ETypeConstructorApplication (Name TypeConstructor)
    | BinaryOp Expr Expr Expr
    | EString String
    | EIf Expr Expr Expr
    | EList (List Expr)
