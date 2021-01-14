const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt } = graphql;

//Dummy Data
var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLString },
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
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        //write code to get whichever data we need from DB
       return _.find(books, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
