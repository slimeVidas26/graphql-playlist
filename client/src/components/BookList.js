import React , {useState} from 'react';
import {graphql} from 'react-apollo'
import { getBooksQuery} from '../queries/queries'
import BookDetails from './BookDetails';





function BookList(props) {

    const [selected , setSelected] = useState(null)
    
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
                <li onClick = {(e)=>{setSelected(book.id)}} key ={book.id}>{book.name}</li>
               
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
              <BookDetails bookId = {selected} />
            </div>
          );
     
  }
  
  export default graphql(getBooksQuery)(BookList);