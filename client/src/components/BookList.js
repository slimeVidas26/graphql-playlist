import React from 'react';
import {graphql} from 'react-apollo'
import { getBooksQuery} from '../queries/queries'




function BookList(props) {
console.log(props)
     function displayBooks(){
        if(props.data.loading){
            return (
                <div>Loading Books ...</div>
            )
        }
        else{
            return props.data.books.map(book=>{
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