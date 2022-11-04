/*----- constants -----*/

/*----- app's state (variables) -----*/
let myItems, myItemsfromLocalstorage;

/*----- cached element references -----*/
const inputEL = document.getElementById('input');
const addBtn = document.getElementById('btn-add');
const ulEl = document.getElementById('ul-id');
const removeBtns = document.querySelectorAll('button');
console.log(removeBtns);

/*----- event listeners -----*/
addBtn.addEventListener('click', ()=>{
    if(inputLength() > 0){
        myItems.push(inputEL.value);
        localStorage.setItem('myItems', JSON.stringify(myItems));
        inputEL.value = '';
        render();
        // reloadPage();
    } 
});

/*----- functions -----*/
init();

function init(){
    myItems =[];
    myItemsfromLocalstorage = JSON.parse(localStorage.getItem('myItems'));
    if(myItemsfromLocalstorage){
        myItems = myItemsfromLocalstorage;
    }
    render();
}

function render(){
    emptyUl();
    myItems.forEach((myItem) =>{
        addRow(myItem);
    });
    if(myItems.length){
        clearRow();
    }
}

function addRow(myItem){
    const newLiEl = document.createElement('li');
    newLiEl.classList.add('flex-item-row');
    const newPEl = document.createElement('p');
    const newBtn = document.createElement('button');
    newBtn.classList.add('delete-btn');
    insertElements(newLiEl, newPEl, newBtn, myItem);
}

function insertElements(li, p, btn, myItem){
    ulEl.appendChild(li);
    li.appendChild(p);
    p.appendChild(document.createTextNode(myItem));
    li.appendChild(btn);
    btn.appendChild(document.createTextNode('X'));
    btn.addEventListener('click', (e)=>{
        let itemToDelete = e.target.previousElementSibling.innerHTML;
        let idxOfItemToDelete;
        e.target.parentElement.remove();
        idxOfItemToDelete = myItemsfromLocalstorage.findIndex(item => item === itemToDelete);
        myItems.splice(idxOfItemToDelete, 1);
        localStorage.setItem('myItems', JSON.stringify(myItems));
        reloadPage();
    });
}

function clearRow(){
    const newLiEl = document.createElement('li');
    newLiEl.classList.add('flex-clear-row');
    const newBtn = document.createElement('button');
    newBtn.classList.add('delete-all-btn');
    ulEl.appendChild(newLiEl);
    newLiEl.appendChild(newBtn);
    newBtn.appendChild(document.createTextNode('Clear All'));
    newBtn.addEventListener('click', (e)=>{
        localStorage.removeItem('myItems');
        reloadPage();
    });
}

function emptyUl(){
    return ulEl.innerHTML = '';
}

function inputLength(){
    return inputEL.value.length;
}

function reloadPage(){
    location.reload();
  
}
