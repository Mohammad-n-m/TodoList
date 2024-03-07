let $=document;
let BtnAdd=$.querySelector('.addItembtn')
let BtnClear=$.querySelector('.clearItemsBtn')
let UserInput=$.querySelector('.userInput')
let DivItems=$.querySelector('.UserTodos')
window.addEventListener('load', getLocalStorage)


BtnAdd.addEventListener('click',function(){
    let InputValue="";
    if(UserInput.value){
         InputValue=UserInput.value;
         let obj={
            id:TodoArray.length+1,
            value:InputValue,
            complete:false
         }
         TodoArray.push(obj)
    }
    UserInput.value="";
    UserInput.focus()

    LocalHostHandler(TodoArray);
    createElemHandler(TodoArray)
})

// Set Todos On LocalHost
function LocalHostHandler(ExArray){
    localStorage.setItem('todos', JSON.stringify(ExArray))
}

function createElemHandler(ExArray){
    // delete all items and create element of first.
    $.querySelector('.UserTodos').innerHTML="";

    ExArray.forEach(function(item){
        let CE_div=$.createElement('div');
        CE_div.setAttribute("class","items")
        CE_div.setAttribute("data-id",item.id)


        let CE_P=$.createElement('p');
        CE_P.setAttribute("class","todoValue")
        CE_P.innerHTML=item.value
        
        let CE_div_Btns=$.createElement('div');
        CE_div_Btns.setAttribute("class","btns")

        let CE_Btn_Complete=$.createElement('button');
        if(item.complete){
            CE_Btn_Complete.setAttribute('class','finished')
            CE_Btn_Complete.innerHTML='finished'
        }
        else{
            CE_Btn_Complete.setAttribute('class','complete')
            CE_Btn_Complete.innerHTML='complete'
        }
        CE_Btn_Complete.addEventListener('click',completeElem)
        
        let CE_Btn_deleteItem=$.createElement('button');
        CE_Btn_deleteItem.setAttribute("class","deleteItem")
        CE_Btn_deleteItem.innerHTML="Delete";
        CE_Btn_deleteItem.addEventListener('click',deleteItem)

    // append btns delete and complete
        CE_div_Btns.append(CE_Btn_Complete,CE_Btn_deleteItem)

        CE_div.append(CE_P,CE_div_Btns)

        $.querySelector('.UserTodos').append(CE_div)
    })
}

// clear array and all to-do list
BtnClear.addEventListener('click',function(){
    TodoArray=[];
    LocalHostHandler(TodoArray)
    createElemHandler(TodoArray)

    UserInput.value="";
    UserInput.focus();
})

//Change the state of the element
function completeElem(event){
   let result= TodoArray.find(function(ex){
       return event.target.parentElement.parentElement.dataset.id==ex.id
    })
    console.log(result.complete)
    if(result.complete==false){
        event.target.innerHTML="finished"
        event.target.setAttribute('class',"finished");
        result.complete=true;
    }
    else{
        event.target.innerHTML="complete"
        event.target.setAttribute('class',"complete");
        result.complete=false;
    }
    // for edit and overwrite on LocalHost
    LocalHostHandler(TodoArray)
}
// find index of elem and delete it
function deleteItem(event){
    console.log(event.target.parentElement.parentElement.dataset.id)
    let result= TodoArray.findIndex(function(ex){
        return event.target.parentElement.parentElement.dataset.id==ex.id
     })
     TodoArray.splice(result,1)
    event.target.parentElement.parentElement.remove();
    // for edit and overwrite on LocalHost
    LocalHostHandler(TodoArray)
}

// on load website
function getLocalStorage() {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    if (localStorageTodos) {
        TodoArray = localStorageTodos
    } else {
       // set one tast at first in array and local host
    TodoArray=[{id:1,value:"go shop",complete:false}];
    LocalHostHandler(TodoArray)
    createElemHandler(TodoArray)
    }
    createElemHandler(TodoArray)
}