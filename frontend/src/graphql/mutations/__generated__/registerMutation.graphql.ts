/**
 * @generated SignedSource<<a16a040fa1524bff867662ce9de88e49>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type registerMutation$variables = {
  confirmPassword: string;
  firstName: string;
  password: string;
  taxId: string;
};
export type registerMutation$data = {
  readonly register: {
    readonly expiresIn: number;
    readonly token: string;
  };
};
export type registerMutation = {
  response: registerMutation$data;
  variables: registerMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "confirmPassword"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "firstName"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "password"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "taxId"
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "confirmPassword",
        "variableName": "confirmPassword"
      },
      {
        "kind": "Variable",
        "name": "firstName",
        "variableName": "firstName"
      },
      {
        "kind": "Variable",
        "name": "password",
        "variableName": "password"
      },
      {
        "kind": "Variable",
        "name": "taxId",
        "variableName": "taxId"
      }
    ],
    "concreteType": "AuthResponse",
    "kind": "LinkedField",
    "name": "register",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "token",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "expiresIn",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "registerMutation",
    "selections": (v4/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "registerMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "4fe76bca0660f9ffbaf14f3f021ca0c4",
    "id": null,
    "metadata": {},
    "name": "registerMutation",
    "operationKind": "mutation",
    "text": "mutation registerMutation(\n  $firstName: String!\n  $taxId: String!\n  $password: String!\n  $confirmPassword: String!\n) {\n  register(firstName: $firstName, taxId: $taxId, password: $password, confirmPassword: $confirmPassword) {\n    token\n    expiresIn\n  }\n}\n"
  }
};
})();

(node as any).hash = "20b0f40f1fb64aac2403e90975bace92";

export default node;
