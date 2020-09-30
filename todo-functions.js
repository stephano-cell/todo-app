//1 add event handler to checkbox
//2 modify the correct objects completed property -> toggleTodo
//3 save and rerender

//Get all saved items

const getSavedTodos= function(){
    const todosJSON=localStorage.getItem('todos')
    return todosJSON?JSON.parse(todosJSON):[]
    }
//set todos to local server function
const saveTodosLocal=function(){
    localStorage.setItem('todos',JSON.stringify(todos))
}

//render todos
const renderTodos=function(todos,filters) {
    const filterTodos=todos.filter((todo)=>{
        const searchText =todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompleted=!filters.hideCompleted || !todo.completed
        
        return searchText && hideCompleted
    })
            
    document.querySelector('div#todos').innerHTML=''
    const leftTodos=filterTodos.filter((element)=>{

        return !element.completed
    })
    document.querySelector("div#todos").appendChild(listSummary(leftTodos))
    filterTodos.forEach((element)=>{
       
        //generate todoDOM
        document.querySelector('div#todos').appendChild(generateTodoDOM(element));
        })
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

//when boxes are checked todo.completed to be checked

//generate todo DOM for individual todo
const generateTodoDOM= function(todo){
    
    //create div for span and x button for each todo
    const todoEL=document.createElement('div')
  
 //create delete button for each todo
 const todoButton=document.createElement('button')
 todoButton.textContent='X'
 todoEL.appendChild(todoButton)
 
    //create a span for each todo
    const todoText = document.createElement("span");
    todoText.textContent=todo.text
    todoEL.appendChild(todoText)

     //create check box 
     const todoCheckButton=document.createElement("input")
     todoCheckButton.setAttribute('type','checkbox')
     todoEL.appendChild(todoCheckButton)
    //Check box to be checked if todo is completed
    todoCheckButton.checked=todo.completed

    todoCheckButton.addEventListener('change',function(){
        
        toggleTodo(todo.id)
        renderTodos(todos,filters)
        saveTodosLocal()
    })
  
    todoButton.addEventListener('click',function(){
        
        removeTodo(todo.id)
        renderTodos(todos,filters)
        saveTodosLocal()
        
    })
       
    return todoEL   
 
    }

 
//get the DOM elements for list summary
const listSummary= function(leftTodos){
    const summary=document.createElement("h2")
    summary.textContent=`You have ${leftTodos.length} todos left`
    return summary
}



