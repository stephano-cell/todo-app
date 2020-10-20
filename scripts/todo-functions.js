' use strict'
//Get all saved items

const getSavedTodos= ()=>{
    const todosJSON=localStorage.getItem('todos')

    try{
    return todosJSON?JSON.parse(todosJSON):[]
    }
    catch(e){
        return []
    }
    }
//set todos to local server function
const saveTodos=(todos)=>{
    localStorage.setItem('todos',JSON.stringify(todos))
}

//remove selected todo by ID
const removeTodo=function(id){
    const findTodoID=todos.findIndex((todo)=>{
 return  todo.id===id
     })
     if (findTodoID>-1){
         todos.splice(findTodoID,1)
     }
 }


// toggleTodo completed/not completed if checked
const toggleTodo=function(id){
            
    const findTodoID=todos.find((todo)=>{
        return todo.id===id
    })
    if(findTodoID){
        findTodoID.completed=!findTodoID.completed
    }
}

//render todos
const renderTodos=(todos,filters)=> {
    const todoEl = document.querySelector('#todos')
    const filterTodos=todos.filter((todo)=>{
        const searchText =todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompleted=!filters.hideCompleted || !todo.completed
        
        return searchText && hideCompleted
    })
            
    todoEl.innerHTML=''
    const leftTodos=filterTodos.filter((element)=>{

        return !element.completed
    })
    document.querySelector("#todos").appendChild(listSummary(leftTodos))
    
    //when there are Todos to show append them
    if (filterTodos.length>0){
        filterTodos.forEach((element)=>{
            //generate todoDOM
            document.querySelector('#todos').appendChild(generateTodoDOM(element));
            })
            //when no todos to create paragraph to show message
    }else{
        const noTodosMessage=document.createElement('p')
        noTodosMessage.classList.add('empty-message')
        noTodosMessage.textContent='Nothing to show'
        document.querySelector('#todos').appendChild(noTodosMessage)
    }
}



//when boxes are checked todo.completed to be checked

//generate todo DOM for individual todo
const generateTodoDOM= (todo)=>{
    
    //create label to be able to click anywhere
    const todoEl=document.createElement('label')
    const containerEl=document.createElement('div')
    const checkbox=document.createElement("input")
    const todoText = document.createElement("span");
    const removeButton=document.createElement('button')

     //create check box 
     checkbox.setAttribute('type','checkbox')
      //Check box to be checked if todo is completed
    checkbox.checked=todo.completed
     containerEl.appendChild(checkbox)
    checkbox.addEventListener('change',function(){
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos,filters)
       
    })


      //create a span for each todo
      todoText.textContent=todo.text
      containerEl.appendChild(todoText)

 //setup container
 todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)
 //create delete button for each todo
 removeButton.textContent='remove'
 removeButton.classList.add('button','button--text')
 todoEl.appendChild(removeButton)
    removeButton.addEventListener('click',function(){
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos,filters)
    })
   
    return todoEl   
 
    }

 
//get the DOM elements for list summary
const listSummary= function(leftTodos){
    const summary=document.createElement("h2")
    const plural=leftTodos.length===1?'':"s"
    summary.classList.add('list-title')
    summary.textContent=`You have ${leftTodos.length} todo${plural} left`
    return summary
}



