import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import { RequestParameters } from 'relay-runtime/lib/util/RelayConcreteNode'
import { Variables } from 'relay-runtime/lib/util/RelayRuntimeTypes'

function fetchQuery(operation: RequestParameters, variables: Variables) {
  const token = localStorage.getItem('TOKEN')
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then((response) => response.json())
}

export const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
})
