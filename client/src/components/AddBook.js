import React , {useState} from 'react';
import {graphql} from 'react-apollo';
import {getAuthorsQuery} from '../queries/queries';

function AddBook({data}) {

    const [name , setName] = useState("");
    const [genre , setGenre] = useState("")
    const [authorId , setAuthorId] = useState("")


    function submitForm(e){
        e.preventDefault();
        console.log(name , genre , authorId)
    }


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
           <form id="book-form" onSubmit = {submitForm}>
               <div className = "field">
                   <label>Book Name</label>
                   <input name = {name} type="text" onChange = {(e)=>{setName(e.target.value)}}/>
               </div>

               <div className = "field">
                   <label>Genre</label>
                   <input name = {genre} type="text" onChange = {(e)=>{setGenre(e.target.value)}}/>
               </div>

               <div className = "field">
                   <label>Author</label>
                  <select name ={authorId} onChange = {(e)=>{setAuthorId(e.target.value)}}>
                      <option>Select Author</option>
                      {displayAuthors()}
                  </select>
               </div>

               <button>+</button>
        
           </form>
         );
    
 }
 
 export default graphql(getAuthorsQuery)(AddBook);