// 요소 선택 및 배열 선언
const todoList = document.getElementById('todo-list')
const todoForm = document.getElementById('todo-form')
const todaySpan = document.querySelector("#today")
let todoArr = [];

// displayTodos 함수
function displayTodos() {
  todoList.innerHTML = ""
  todoArr.forEach((aTodo) => {
    const todoItem = document.createElement('li')
    const todoDelBtn = document.createElement('span')
    todoDelBtn.innerText = 'x'
    todoDelBtn.style.color = 'red'
    todoDelBtn.title = '클릭시 삭제'
    todoItem.innerText = aTodo.todoText
    todoItem.title = '클릭시 완료'
    todoItem.classList.add(aTodo.todoDone ? 'done' : 'yet')
    // true 일때 done class를 추가, false일 때 yet 클래스를 추가 
    todoItem.appendChild(todoDelBtn)
    todoDelBtn.addEventListener('click',
      function () {
        let ask = confirm('정말로 삭제하시겠습니까?')
        if (ask == true) {
          handleTodoDelBtnClick(aTodo.todoId)
          alert(`할 일 '${aTodo.todoText}' 삭제되었습니다.`)
        }
        else {
          todoItem.classList.add(aTodo.todoDone = 'yet')
        }

      }
    )
    todoItem.addEventListener('click',
      function () {
          handleTodoItemClick(aTodo.todoId)
      }
    )
    todoList.appendChild(todoItem)
  });
}

// handleTodoDelBtnClick 함수
function handleTodoDelBtnClick(clickedId) {
  todoArr = todoArr.filter(function (aTodo) {
    return aTodo.todoId !== clickedId
  })
  displayTodos()
  saveTodos()
}

// handleTodoItemClick 함수
function handleTodoItemClick(clickedId) {
  todoArr = todoArr.map(function (aTodo) {
    return aTodo.todoId !== clickedId ?
      aTodo : { ...aTodo, todoDone: !aTodo.todoDone }
  })
  displayTodos()
  saveTodos()
}

// saveTodos 함수
function saveTodos() {
  const todoSting = JSON.stringify(todoArr)
  localStorage.setItem('myTodos', todoSting)
}

// loadTodos 함수
function loadTodos() {
  const myTodos = localStorage.getItem('myTodos')
  todoArr = myTodos !== null ? JSON.parse(myTodos) : todoArr
  displayTodos()
}

// 할일 입력 후 제출하면 발생하는 이벤트 핸들링
todoForm.addEventListener('submit',
  function (e) {
    e.preventDefault()
    const toBeAdded = {
      todoText: todoForm.todo.value,
      todoId: new Date().getTime(),
      todoDone: false // 'yet' 이 false를 의미한다.
    }
    if (todoForm.todo.value == "") {
      alert('할 일을 입력해 주세요!')
    }
    else {
      todoArr.push(toBeAdded)
      todoForm.todo.value = ''
    }
    displayTodos()
    saveTodos()
  }
)


function real() {
  const today = new Date() // 오늘 날짜 선언
  let year = today.getFullYear() // 년
  let month = today.getMonth() + 1 // 월 
  let date = today.getDate() // 일
  let hour = today.getHours() // 시
  let minute = today.getMinutes() //분
  let second = today.getSeconds() //초 
  todaySpan.textContent = `${year.toString().padStart(4, "0")}.${month.toString().padStart(2, "0")}.${date.toString().padStart(2, "0")} ${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`

}

real()
setInterval(real, 1000)

loadTodos() // 시작할 때 한번만!