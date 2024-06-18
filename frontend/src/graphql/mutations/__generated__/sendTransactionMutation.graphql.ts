/**
 * @generated SignedSource<<46a693f96a107ceb04ab2ff7a5ff64d8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type sendTransactionMutation$variables = {
  idempotencyKey: string;
  receiverTaxId: string;
  senderAccountNumber: string;
  value: number;
};
export type sendTransactionMutation$data = {
  readonly sendTransaction: {
    readonly id: string;
  } | null | undefined;
};
export type sendTransactionMutation = {
  response: sendTransactionMutation$data;
  variables: sendTransactionMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "idempotencyKey"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "receiverTaxId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "senderAccountNumber"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "value"
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "idempotencyKey",
        "variableName": "idempotencyKey"
      },
      {
        "kind": "Variable",
        "name": "receiverTaxId",
        "variableName": "receiverTaxId"
      },
      {
        "kind": "Variable",
        "name": "senderAccountNumber",
        "variableName": "senderAccountNumber"
      },
      {
        "kind": "Variable",
        "name": "value",
        "variableName": "value"
      }
    ],
    "concreteType": "Transaction",
    "kind": "LinkedField",
    "name": "sendTransaction",
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
    "name": "sendTransactionMutation",
    "selections": (v4/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "sendTransactionMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "b9f90adfcd01742a27adbe365eb00e05",
    "id": null,
    "metadata": {},
    "name": "sendTransactionMutation",
    "operationKind": "mutation",
    "text": "mutation sendTransactionMutation(\n  $senderAccountNumber: String!\n  $receiverTaxId: String!\n  $value: Int!\n  $idempotencyKey: String!\n) {\n  sendTransaction(senderAccountNumber: $senderAccountNumber, receiverTaxId: $receiverTaxId, value: $value, idempotencyKey: $idempotencyKey) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "a595857f05787b8f9ef172aba0c529b4";

export default node;
