'use strict'
let todos=getSavedTodos()
    let filters={
        searchText:"",
        hideCompleted:false
    }

//render search todo
renderTodos(todos,filters)
    

document.querySelector('input#search-text').addEventListener('input',function(e){

    filters.searchText=e.target.value
 
    renderTodos(todos,filters)
 })

 document.querySelector('form#todo-text').addEventListener('submit',function(e){
     e.preventDefault()
     
    todos.push({
        //add unique identifier for each todo

        id:uuidv4(),
        text:e.target.elements.todoText.value,
        completed:false
    })
        //add in local storage every time adding new todo    
        saveTodosLocal()       
       renderTodos(todos,filters)
    e.target.elements.todoText.value=''
   
 })


document.querySelector("label#hide-complete").addEventListener('change',function(e){    
filters.hideCompleted=e.target.checked
renderTodos(todos,filters)
})
