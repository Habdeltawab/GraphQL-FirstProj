import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

//Components
import BookList from "./components/BookList";
import AddBook from './components/AddBook'

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
        <AddBook/>
      </div>
    </ApolloProvider>
  );
}

export default App;
