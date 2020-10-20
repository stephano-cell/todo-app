'use strict'
let todos=getSavedTodos()
    let filters={
        searchText:"",
        hideCompleted:false
    }

//render search todo
renderTodos(todos,filters)
    

document.querySelector('#search-text').addEventListener('input',function(e){

    filters.searchText=e.target.value
 
    renderTodos(todos,filters)
 })

 document.querySelector('#todo-text').addEventListener('submit',function(e){
     
    const text=e.target.elements.todoText.value.trim()
    e.preventDefault() 

     if(text.length>0){
   
    todos.push({
        //add unique identifier for each todo
        id:uuidv4(),
        text,
        completed:false
    })
        //add in local storage every time adding new todo    
        saveTodos(todos)       
        renderTodos(todos,filters)
        e.target.elements.todoText.value=''
}
 })


document.querySelector("#hide-complete").addEventListener('change',function(e){    
filters.hideCompleted=e.target.checked
renderTodos(todos,filters)
})
