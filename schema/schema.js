const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull,
	GraphQLID,
} = require('graphql');
const _ = require('lodash');

//Hardcoded data
// const customers = [
// 	{
// 		id: '1',
// 		name: 'John Doe',
// 		email: 'nkem@gmail.com',
// 		age: 35,
// 	},
// 	{
// 		id: '2',
// 		name: 'Jane Doe',
// 		email: 'nkemobiii@gmail.com',
// 		age: 45,
// 	},
// 	{
// 		id: '3',
// 		name: 'Johnnnn Mceronroe',
// 		email: 'nkem@ymail.com',
// 		age: 5,
// 	},
// ];

//Book Type
const CustomerType = new GraphQLObjectType({
	name: 'Customer',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		age: { type: GraphQLInt },
	}),
});

//Root Query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: {
				id: { type: GraphQLID },
			},
			resolve(parent, args) {
				return _.find(books, { id: args.id });
			},
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return books;
			},
		},
		author: {
			type: AuthorType,
			args: {
				id: { type: GraphQLID },
			},
			resolve(parent, args) {
				return _.find(authors, { id: args.id });
			},
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				return authors;
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
