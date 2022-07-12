const todoForm = document.querySelector("#todoForm"),
    input = todoForm.querySelector("input"),
    todoList = document.querySelector('#todoList');
let mainDiv = document.querySelector("#mainDiv")

const TODO_Ls = 'toDos';
let toDos = [];

function saveToDos() {
    localStorage.setItem(TODO_Ls, JSON.stringify(toDos)); // localStorage에 리스트 저장
  }

function output(text) {
    let li = document.createElement('li');
    let Btn = document.createElement('button');
    let newDiv = document.createElement('div');
    const newId = toDos.length + 1;
    Btn.innerText = '삭제';
    newDiv.innerText = text;
    li.appendChild(newDiv);
    li.appendChild(Btn);
    li.id = newId;
    todoList.appendChild(li);
    Btn.addEventListener('click',del);
    newDiv.addEventListener('dblclick', handleModify);
    const toDoObj = {
      text,
      id: newId,
    };
    toDos.push(toDoObj); // toDos에 toDoList 삽입
    saveToDos();
    }

function handleModify(event) {
    event.preventDefault();
    const div = event.target;
    const li = div.parentNode;
    let form = document.createElement('form');
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('value', `${div.innerText}`);
    form.appendChild(input);
    div.style.visibility='hidden'
    li.prepend(form);
    form.addEventListener('submit', (text) => {
        if (input.value) {
            const currentValue = input.value;
            div.innerText = currentValue;
            form.remove();
            div.style.visibility='visible'
            saveModify(li,currentValue);
        };
    });
    }
    // form.addEventListener('submit', modify);


function saveModify(li,text) {
    const modifyLs = toDos.filter(function(toDo){
        if (toDo.id === parseInt(li.id)){
            toDo.text = text};
        return toDo;
    })
    toDos = modifyLs; // 추출된 내용을 toDos에 넣음
    saveToDos();
}

function del(event){
    const Btn = event.target;
    const li = Btn.parentNode;
    li.remove();
    const clearLs = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    })
    toDos = clearLs; // 추출된 내용을 toDos에 넣음
    saveToDos(); // localStorage에 저장
    }


function handleSubmit(event){
    event.preventDefault();
    if (input.value) {
        const currentValue = input.value;
        output(currentValue);
        input.value = "";
        }
    }

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODO_Ls);
    // localStorage에 TODO_Ls가 있는지 확인
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos); // loadedToDos를 json객체로 변경
        parsedToDos.forEach(function (toDo) { // 객체 내용 한개씩 파라미터로 넣어서 함수 실행
        output(toDo.text); // 리스트 추가하는 함수
        });
    }
    }

function init() {
    loadToDos();
    todoForm.addEventListener('submit', handleSubmit);
    }


init();