const graphql = require('graphql');
const {GraphQLObjectType ,
     GraphQLString ,
     GraphQLInt,
     GraphQLID,
     GraphQLSchema,
     GraphQLList,
    } = graphql;
const _ = require('lodash')

//dummy data
var books = [
    {name : "Le nom de la rose" , genre : "History" , id : "1" , authorId:"1"},
    {name : "Piege de Cristal" , genre : "Policier" , id : "2" , authorId:"3"},
    {name : "5Th Avenue" , genre : "Sci-Fi" , id : "3" , authorId:"2"},
    {name : "La Melodie Du Bonheur" , genre : "Amour" , id : "4" , authorId:"2"},
    {name : "L'arme Fatale" , genre : "Policier" , id : "5" , authorId:"3"},
    {name : "Central Park" , genre : "Enquete" , id : "6" , authorId:"3"}
];

var authors = [
    {name : "John Le Carre" , age : 45 , id : "1"},
    {name : "Guillaume Musso" , age : 56 , id : "2"},
    {name : "Douglas Kennedy" , age : 68 , id : "3"},
];

 //create Book Type
const BookType = new GraphQLObjectType({
    name  : 'Book',
    fields :()=> ({
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        genre : {type : GraphQLString},
        author : {
            type : AuthorType,
           resolve(parent , args){
               console.log(parent);
               return  _.find(authors , {id : parent.authorId})
           }
        }
    })
});

//create Author Type
const AuthorType = new GraphQLObjectType({
    name  : 'Author',
    fields :()=> ({
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        age : {type : GraphQLInt},
        books : {
            type : new GraphQLList(BookType),
            resolve(parent,args){
                console.log(parent)
                return  _.filter(books , {authorId : parent.id})
            } 
        }
      
    })
});

//create Root Query
const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
       book : {
           type : BookType,
           args : {id:{type:GraphQLID}},
           resolve(parent , args){
              return _.find(books , {id : args.id})
           }
       },
       author : {
        type : AuthorType,
        args : {id:{type:GraphQLID}},
        resolve(parent , args){
           return _.find(authors , {id : args.id})
        }
    },
      books : {
          type : new GraphQLList(BookType),
          resolve(parent , args){
              return books
          }
      },
      authors : {
          type : new GraphQLList(AuthorType),
          resolve(parent , args){
              return authors
          }
      }
    }
});

module.exports = new GraphQLSchema({
    query : RootQuery
})