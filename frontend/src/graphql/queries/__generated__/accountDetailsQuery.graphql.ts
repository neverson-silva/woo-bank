/**
 * @generated SignedSource<<e57fde717ed56c89073ffe541bf9a1a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type accountDetailsQuery$variables = Record<PropertyKey, never>;
export type accountDetailsQuery$data = {
  readonly accountDetails: {
    readonly accountNumber: string;
    readonly balance: number;
    readonly user: {
      readonly id: string;
    };
  } | null | undefined;
};
export type accountDetailsQuery = {
  response: accountDetailsQuery$data;
  variables: accountDetailsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "AccountDetails",
    "kind": "LinkedField",
    "name": "accountDetails",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "balance",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "accountNumber",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "accountDetailsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "accountDetailsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "c606eeb268fa1afec57d451f1f69c14a",
    "id": null,
    "metadata": {},
    "name": "accountDetailsQuery",
    "operationKind": "query",
    "text": "query accountDetailsQuery {\n  accountDetails {\n    balance\n    accountNumber\n    user {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a86b640b53d57173d0f49bb8a1be2635";

export default node;
