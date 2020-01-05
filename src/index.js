import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/App'
import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { HttpLink, createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import Context from './Context'

const cache = new InMemoryCache()
const link = createHttpLink({
  uri: 'https://petgram-server.midudev.now.sh/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(link),
  cache,
  onError: error => {
    const { networkError } = error
    if(networkError && networkError.result.code === 'invalid_token'){
      window.sessionStorage.removeItem('token')
      window.location.href = '/'
    }
  }
})

ReactDOM.render(
  <Context.Provider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Context.Provider>,
  document.getElementById('app')
)
