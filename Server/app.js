const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

//Connect to mlab DB
mongoose.connect('mongodb+srv://hosam:test123@graphql-hosam.nrk8q.mongodb.net/graphql-hosam?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('Connected to DB...');
})

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("listening on port 4000...");
});
