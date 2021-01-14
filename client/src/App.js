import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

//Components
import BookList from "./components/BookList";

// Apollo client set-up
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Hosam's Reading List</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
