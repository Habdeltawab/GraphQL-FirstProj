import { gql } from "apollo-boost";

const queries = {
  getAuthorsQuery: gql`
    {
      authors {
        name
        id
      }
    }
  `,

  getBooksQuery: gql`
    {
      books {
        name
        id
      }
    }
  `,

  addBookMutation: gql`
    mutation {
      addBook(name: "", genre: "", authorId: "") {
        name
        id
      }
    }
  `,
};

export { queries };
