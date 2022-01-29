const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const schema = require("./schema/schema");
const connectDB = require('./config/db');

const app = express();

//Connect Database
connectDB();

app.use(
	'/graphql',
	expressGraphQL({
		schema: schema,
		graphiql: true,
	})
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))