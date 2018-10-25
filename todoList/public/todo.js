var todoInput = document.getElementById('todoInput')
var todoList = document.getElementById('todoList')
var deleteButton = document.getElementById('deleteListItem')
var listObjs

/* create list elements and add to DOM */

function addListItemToDom(id,value,callback){
  let listItem = document.createElement('li')
  listItem.id = 'listItem' + id
  let listItemCheckBox = document.createElement('INPUT')
  listItemCheckBox.type = 'checkbox'
  listItemCheckBox.id = 'listItemCheckBox' + id
  listItemCheckBox.name = 'listItemCheckBox'

  let listItemValue = document.createElement('span')
  listItemValue.id = 'listItemValue' + id
  listItemValue.innerText = value
  listItemValue.contentEditable = true
  
  todoList.appendChild(listItem)
  listItem.appendChild(listItemCheckBox)
  listItem.appendChild(listItemValue)

  callback(id,value)
}


fetch('http://localhost:8000/first-list')
  .then(function(response){return response.json()})
  .then(function(initialList){
    listObjs = initialList
    for(const singleItem of initialList){
      addListItemToDom(singleItem.listID.slice(8),singleItem.listDetail)
    }
  })


todoInput.addEventListener('keypress',function(event){
  if (event.key === 'Enter'){
    addListItemToDom((todoList.childElementCount == 0)? 1:++todoList.lastElementChild.id.slice(8),todoInput.value,function(id,value){
      let data = {
        listID: id,
        listDetail: value
      }
  
      listObjs.push(data)
  
      let fetchData = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      }
  
      fetch('http://localhost:8000/newList',fetchData)
        .then(function(response){
          console.log('called newList')
        })
    })
  }
})

deleteButton.addEventListener('click',function(){
  let allListItems = todoList.getElementsByTagName('li')
  let deleteListItemIds = []
  for(const listItem of allListItems){
    let listItemDetail = listItem.getElementsByTagName('input')
    if(listItemDetail[0].checked){
      deleteListItemIds.push(listItem.id)
    }
  }

  for(let listItemId of deleteListItemIds){
    document.getElementById(listItemId).remove()
  }
})

todoList.addEventListener('focusout',function(e){
  console.log(e.target.innerText)

  if(listObjs.find(listObj => listObj.listID == e.target.id).listDetail != e.target.innerText){
    
    let data = {
      listID: e.target.id,
      listDetail: e.target.innerText
    }



    let fetchData = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
    }

    fetch('http://localhost:8000/listUpdate',fetchData)
    .then(function(response){
      console.log('called listUpdate')
    })
  }
})