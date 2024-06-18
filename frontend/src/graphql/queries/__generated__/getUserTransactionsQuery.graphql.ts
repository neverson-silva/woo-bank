/**
 * @generated SignedSource<<51d6e7f9924f5ac326c8f2b18c3a6ada>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type getUserTransactionsQuery$variables = Record<PropertyKey, never>;
export type getUserTransactionsQuery$data = {
  readonly getUserTransactions: ReadonlyArray<{
    readonly createdAt: string;
    readonly id: string;
    readonly receiver: {
      readonly accountNumber: string;
      readonly user: {
        readonly firstName: string;
      } | null | undefined;
    };
    readonly sender: {
      readonly accountNumber: string;
      readonly user: {
        readonly firstName: string;
      } | null | undefined;
    };
    readonly value: number;
  } | null | undefined> | null | undefined;
};
export type getUserTransactionsQuery = {
  response: getUserTransactionsQuery$data;
  variables: getUserTransactionsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "accountNumber",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v3 = [
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "user",
    "plural": false,
    "selections": [
      (v2/*: any*/)
    ],
    "storageKey": null
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v6 = [
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "user",
    "plural": false,
    "selections": [
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "storageKey": null
  },
  (v0/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "getUserTransactionsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Transaction",
        "kind": "LinkedField",
        "name": "getUserTransactions",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "sender",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "receiver",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "getUserTransactionsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Transaction",
        "kind": "LinkedField",
        "name": "getUserTransactions",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "sender",
            "plural": false,
            "selections": (v6/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "receiver",
            "plural": false,
            "selections": (v6/*: any*/),
            "storageKey": null
          },
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "176858943e02a6356288eb5f50e1ed13",
    "id": null,
    "metadata": {},
    "name": "getUserTransactionsQuery",
    "operationKind": "query",
    "text": "query getUserTransactionsQuery {\n  getUserTransactions {\n    id\n    sender {\n      accountNumber\n      user {\n        firstName\n        id\n      }\n      id\n    }\n    receiver {\n      accountNumber\n      user {\n        firstName\n        id\n      }\n      id\n    }\n    value\n    createdAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "a9ac899845b3aa07e6dc8b30bd2af8bf";

export default node;
