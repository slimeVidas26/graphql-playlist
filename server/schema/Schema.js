
//require graphql
const graphql = require('graphql');
const _  = require('lodash')

//destructuring graphql Object
const {
     GraphQLObjectType ,
     GraphQLString , 
     GraphQLSchema,
     GraphQLID,
     GraphQLInt
    } = graphql;

//dummy data
var books = [
    {name : "Name of the Wind" , genre : "Fantasy" , id :"1"},
    {name : "The Final Empire" , genre : "Fantasy" , id :"2"},
    {name : "The Long Earth" , genre : "Sci-Fi" , id :"3"}
]

var authors = [
    {name : "Tom Wolf" , age : 45 , id :"1"},
    {name : "Michel Stern" , age : 60 , id :"2"},
    {name : "Guillaume Musso" , age : 58 , id :"3"}
]

//create Book Type
const BookType = new GraphQLObjectType({
    name : 'Book',
    fields : ()=>({
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        genre : {type : GraphQLString}
    })
});

//create Book Type
const AuthorType = new GraphQLObjectType({
    name : 'Author',
    fields : ()=>({
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        age : {type :GraphQLInt}
    })
});



//create Root Query
const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        book : {
            type : BookType , 
            args : {id : {type : GraphQLID}},
            resolve(parent , args){
              //code to get data from database
             return  _.find(books , {id : args.id})
            }
        },
        author : {
            type : AuthorType,
            args : {id : {type : GraphQLID}},
            resolve(parent , args){
                return _.find(authors , {id : args.id})
            }
        }
    }
});



module.exports = new GraphQLSchema({
    query : RootQuery
})