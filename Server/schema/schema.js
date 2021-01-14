//#region Imports
const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} = graphql;
//#endregion

//#region Dummy Data
var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "1" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "2" },
];
var authors = [
  { name: "Hosam", age: 24, id: "1" },
  { name: "Raghda", age: 21, id: "2" },
  { name: "Moby", age: 22, id: "3" },
];
//#endregion

//#region Data Types
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});


const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});
//#endregion

//#region Root Query

//Root Query is how initially get into the graph to grab data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //write code to get whichever data we need from DB
        return _.find(books, { id: args.id });
      },
    },

    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //write code to get whichever data we need from DB
        return _.find(authors, { id: args.id });
      },
    },

    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },

    authors: {
        type: new GraphQLList(AuthorType),
        resolve(parent, args){
            return authors
        }
    }
  },
});
//#endregion

module.exports = new GraphQLSchema({
  query: RootQuery,
});
