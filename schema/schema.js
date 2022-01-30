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
const Book = require('../models/Book');
const Author = require('../models/Author');

//Hardcoded data
const books = [
	{
		id: '1',
		name: 'The harder they fall',
		genre: 'Fantasy',
		authorId: '1',
	},
	{
		id: '2',
		name: 'Deadpool',
		genre: 'Sci-Fi',
		authorId: '2',
	},
	{
		id: '3',
		name: 'Upgrade',
		genre: 'Action',
		authorId: '3',
	},
];

const authors = [
	{
		id: '1',
		name: 'John Doe',
		age: 35,
	},
	{
		id: '2',
		name: 'Jane Doe',
		age: 45,
	},
	{
		id: '3',
		name: 'Johnnnn Mceronroe',
		age: 5,
	},
	{
		id: '4',
		name: 'Kolawole Ogunfowakan',
		age: 35,
	},
	{
		id: '5',
		name: 'Erin Deji',
		age: 45,
	},
	{
		id: '6',
		name: 'Dave Omoreige',
		age: 5,
	},
];

//Book Type
const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				//return _.find(authors,{id:parent.authorId})
				return Author.findById(parent.authorId);
			},
		},
	}),
});

//Author Type
const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: BookType,
			resolve(parent, args) {
				//return _.find(books,{authorId:parent.id})
				return Book.find({ authorId: parent.id });
			},
		},
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
				//return _.find(books, { id: args.id });
				return Book.findById(args.id);
			},
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				//return books;
				return Book.find({});
			},
		},
		author: {
			type: AuthorType,
			args: {
				id: { type: GraphQLID },
			},
			resolve(parent, args) {
				//return _.find(authors, { id: args.id });
				return Author.findById(args.id);
			},
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				//return authors;
				return Author.find({});
			},
		},
	},
});

//Mutations
const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args) {
				let author = new Author({
					name: args.name,
					age: args.age,
				});
				return author.save();
			},
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				authorId: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				let book = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId,
				});
				return book.save();
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
