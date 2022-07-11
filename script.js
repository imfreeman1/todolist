const todoForm = document.querySelector("#todoForm"),
    input = todoForm.querySelector("input"),
    todoList = document.querySelector('#todoList');
let mainDiv = document.querySelector("#mainDiv");


function output(text) {
    let li = document.createElement('li');
    let Btn = document.createElement('button');
    let newDiv = document.createElement('div');
    Btn.innerText = '삭제';
    newDiv.innerText = text;
    li.appendChild(newDiv);
    li.appendChild(Btn);
    todoList.appendChild(li);
    Btn.addEventListener('click',del);
    }


function del(event){
    const Btn = event.target;
    const li = Btn.parentNode;
    li.remove();
    }


function handleSubmit(event){
    event.preventDefault();
    if (input.value) {
        const currentValue = input.value;
        output(currentValue);
        input.value = "";
    }
    }
function init() {
    todoForm.addEventListener('submit', handleSubmit);
    }


init();