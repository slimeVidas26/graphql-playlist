
//require graphql
const graphql = require('graphql');
const _  = require('lodash')

//destructuring graphql Object
const {
     GraphQLObjectType ,
     GraphQLString , 
     GraphQLSchema,
     GraphQLID
    } = graphql;

//dummy data
var books = [
    {name : "Name of the Wind" , genre : "Fantasy" , id :"1"},
    {name : "The Final Empire" , genre : "Fantasy" , id :"2"},
    {name : "The Long Earth" , genre : "Sci-Fi" , id :"3"}
]

var movies = [
    {name : "Ben Hur" , genre : "History" , id :"1"},
    {name : "Tequila Sunrise" , genre : "Romance" , id :"2"},
    {name : "Orange Mecanique" , genre : "Sci-Fi" , id :"3"}
]

//create Book Type
const BookType = new GraphQLObjectType({
    name : 'Book',
    fields : ()=>({
        id : {type : graphql.GraphQLID},
        name : {type : GraphQLString},
        genre : {type : GraphQLString}
    })
});



//create Root Query
const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        book : {
            type : BookType , 
            args : {id : {type : graphql.GraphQLID}},
            resolve(parent , args){
              //code to get data from database
             return  _.find(books , {id : args.id})
            }
        }
    }
});



module.exports = new GraphQLSchema({
    query : RootQuery
})