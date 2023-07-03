// Add item to list via Form
// remove items from list by click the "x" button
// clear all items with 'clear ' button
// filter the items by typing in the field
// add localStorage to persist items  
// click on an item to put into "eidt mode " and add to Form 
// update item 
// deploy to netlify



const itemInput=document.querySelector('#item-input');
const itemForm=document.querySelector("#item-form")
const itemList=document.querySelector('#item-list')  //ul
const clearBtn=document.querySelector('#clear')
const itemFilter=document.querySelector('#filter')
const formBtn=itemForm.querySelector('button')
let isEditMode=false;


function displayItems()
{
   const  itemsFromStorage=getItemFromStorage();
   itemsFromStorage.forEach( (item)=> addItemToDOM(item));
}


 //add items
 
 function onAddItemSubmit(e)
 {
    const newItem=itemInput.value;
    e.preventDefault();
 
    if(newItem==='')
    {
        alert('Please add some Target')
        return;
    }
  
    //create list item
  

    checkUI()
    if(isEditMode)
    {

      const itemToEdit=itemList.querySelector('.edit-mode');
      removeItemFromStorage('itemToEdit.text')
      itemList.classList.remove('edit-mode')
      itemToEdit.remove()
      isEditMode=false;

    }
  
   else
   {
      if(checkIfItemExists(newItem))
      {
         alert('This item already exist');
         return ;                //not goes to addItemToDom function so not item add
      }
   }

  //create item Dom element  
   addItemToDOM(newItem);


   //create item to local storage
   addItemToStorage(newItem);


     checkUI();
     itemInput.value='';
    }


    function addItemToDOM(item)
    {
      
      const li=document.createElement('li')
      li.appendChild(document.createTextNode(item))
      const button=createButton('remove-item btn-link text-red') ; //button functionremove-item btn-link text-red
      li.appendChild(button)
      itemList.appendChild(li);
    }

   

 function createButton(classes)
 {
    const button=document.createElement('button');
    button.className=classes
    const icon=createIcon('fa-solid fa-multiply');
    button.appendChild(icon);   // button and icon are grouped or appended
    return button;

 }
 
 function createIcon(classes)
 {
    const icon=document.createElement('i')
    icon.className=classes
    return icon;
 }

 function addItemToStorage(item)
 {
   const itemsFromStorage=getItemFromStorage();
 
    
   itemsFromStorage.push(item);

   //convert to json string and set to local storage
   localStorage.setItem('items',JSON.stringify(itemsFromStorage))
 }

// seperate func for check the local storage is null or not
 function getItemFromStorage()
 {
   let itemsFromStorage;
   if(localStorage.getItem('items')===null)  //localStorage is global obj
   
   {
      itemsFromStorage=[]
   }
   else{
      itemsFromStorage= JSON.parse(localStorage.getItem('items'));
   }
   return itemsFromStorage;

 }






  //              remove element and clear element


  function onClickItem(e)
  {
      
   console.log(e.target);
   if(e.target.parentElement.classList.contains("remove-item"))
       { removeItem(e.target.parentElement.parentElement);
       }

   else
   {
       setItemToEdit(e.target);
       console.log(e.target);
   }
  }


  function checkIfItemExists(item)
  {
   const itemsFromStorage=getItemFromStorage();
   if(itemsFromStorage.includes(item))
   {
      return true
   }
   else
   {
      return false;
   }
  }

  function setItemToEdit(item)
  {
   isEditMode=true;
   itemList.querySelectorAll('li').forEach( (i)=>{i.classList.remove('edit-mode');
   
  }
   )
   item.classList.add('edit-mode')
   formBtn.innerHTML='<i class="fa-solid fa-pen"></i>  Update Target';
   formBtn.style.backgroundColor="green"
   itemInput.value=item.textContent

  }



  function removeItem(item)
  {
  if(confirm('Are you sure to remove')) ;
  //remove item from dom
  
  item.remove();

   //remove item from local storage
  removeItemFromStorage(item.textContent);
   checkUI();

   //


  }

 
function  removeItemFromStorage(item)
{
let itemsFromStorage=getItemFromStorage();

//filter out item to be removed
itemsFromStorage=itemsFromStorage.filter((i)=>i!==item)

// re set to local storage
localStorage.setItem('items',JSON.stringify(itemsFromStorage));

}




  function  clearItems(e)
  {
    itemList.innerHTML=''
    localStorage.removeItem('items');
    checkUI();

  }

function filterItem(e){
   const items=itemList.querySelectorAll('li'); //alll li
   const text=e.target.value.toLowerCase();
   items.forEach(item=>{
      const itemName=item.firstChild.textContent.toLowerCase();  // firstchld textnode, secondchild button in html 
      console.log(itemName);

      if(itemName.indexOf(text)!=-1)      //it return 1  or -1
      {
         item.style.display='flex'
         blue;

      }
      else
      {
         item.style.display='none'
      }
   })

}


  function checkUI()
  {
   const items=itemList.querySelectorAll('li'); //alll li
   console.log(items);
   console.log(items.length);
   if(items.length===0)
   {
      clearBtn.style.display='none';
      console.log('e');
      itemFilter.style.display='none'
      console.log('none');
   }
    

   else
   {
      clearBtn.style.display='block'
      itemFilter.style.display='block'
   
  formBtn.innerHTML='<i class="fa-solid fa-plus"></i> Enter New';
  formBtn.style.backgroundColor='#333'
   
   }
   


  }

  

  function init(){
  itemForm.addEventListener('submit',onAddItemSubmit)   //eventlisten
   itemList.addEventListener('click',onClickItem)
  clearBtn.addEventListener('click',clearItems)
  itemFilter.addEventListener('input',filterItem)
  document.addEventListener('DOMContentLoaded',displayItems)
  checkUI();
  }


  init()
  

