const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} = graphql;

//Dummy Data
var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3" },
];
var authors = [
  { name: "Hosam", age: 24, id: "1" },
  { name: "Raghda", age: 21, id: "2" },
  { name: "Moby", age: 22, id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

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
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
