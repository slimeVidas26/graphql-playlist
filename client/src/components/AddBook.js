import React from 'react';
import {graphql} from 'react-apollo';
import {getAuthorsQuery} from '../queries/queries'





function AddBook({data}) {

    function displayAuthors(){
       if(data.loading){
           return (
               <option>Loading Authors ...</option>
           )
       }
       else{
           return data.authors.map(author=>{
              return(
                  <option key = {author.id}>{author.name}</option>
              )
           })
       }
   }
 
   
       return (
           <form id="book-form">
               <div className = "field">
                   <label>Book Name</label>
                   <input type="text"/>
               </div>

               <div className = "field">
                   <label>Genre</label>
                   <input type="text"/>
               </div>

               <div className = "field">
                   <label>Author</label>
                  <select>
                      <option>Select Author</option>
                      {displayAuthors()}
                  </select>
               </div>

               <button>+</button>
        
           </form>
         );
    
 }
 
 export default graphql(getAuthorsQuery)(AddBook);