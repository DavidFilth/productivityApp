import NavBar from './components/navbar/navbar';
import { client } from './util/graphql/client';
import { ApolloProvider } from 'react-apollo';
import * as React from 'react';

class App extends React.Component {
  render() {
    return (
        <ApolloProvider client={client}>
          <NavBar/>
        </ApolloProvider>
    );
  }
}

export default App;
