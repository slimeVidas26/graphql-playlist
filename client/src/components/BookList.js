import React from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo'


//quety data
const getBooksQuery =  gql`
{
    books{
        name
        id
    }
}
`


function BookList({data}) {

     function displayBooks(){
        if(data.loading){
            return (
                <div>Loading Books ...</div>
            )
        }
        else{
            return data.books.map(book=>{
               return(
                   <li key = {book.id}>{book.name}</li>
               )
            })
        }
    }
  
    
        return (
            <div className="book-list">
            <h2>Ninja Book List</h2>
              <ul>
                 {displayBooks()}
              </ul>
            </div>
          );
     
  }
  
  export default graphql(getBooksQuery)(BookList);