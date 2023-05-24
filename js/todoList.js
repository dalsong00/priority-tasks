const getSelector = (selector) => document.querySelector(selector);
const getSelectorAll = (selector) => document.querySelectorAll(selector);

const todoInput = getSelector(".todo-input");
const importanceCheck = getSelector(".importance-checkbox");
const urgencyCheck = getSelector(".urgency-checkbox");
const addTodoBtn = getSelector(".todo-add-btn");
const removeAllTodoBtn = getSelector(".todo-remove-all-btn");

const quadrantList = getSelectorAll(".quadrant");
const quadrant1 = getSelector(".quadrant1-list");
const quadrant2 = getSelector(".quadrant2-list");
const quadrant3 = getSelector(".quadrant3-list");
const quadrant4 = getSelector(".quadrant4-list");

let id = 0;

let todoList = [];

// id 생성하기
const makeNewId = () => {
  if (todoList.length > 0) {
    id = todoList[todoList.length - 1].id + 1;
    return id;
  } else {
    return id++;
  }
};

// 화면 로드 시 로컬스토리지에 투두리스트가 저장되어 있는지 확인
const checkLocalStorage = () => {
  let localStorageItem = getLocalStorage("todoList");
  if (localStorageItem) {
    todoList = JSON.parse(localStorageItem);
    positionTodoListItem(todoList);
    checkCompletedTodoList(todoList);
  }
};

const checkCompletedTodoList = (todoList) => {
  const completedTodo = todoList
    .filter((item) => item.completed)
    .map((item) => item.id);
  completedTodo.forEach((id) => {
    const completedLabel = document.getElementById(id);
    const inputElement = completedLabel.querySelector("input");

    completedLabel.classList.add("completed");
    inputElement.checked = true;
  });
};

// 투두리스트 더하기
const addTodoList = () => {
  const newTodo = {
    id: makeNewId(),
    content: todoInput.value,
    importance: importanceCheck.checked,
    urgency: urgencyCheck.checked,
    completed: false,
  };

  todoList = [...todoList, newTodo];

  return newTodo;
};

const addAndDisplayTodo = () => {
  if (!todoInput.value) {
    return;
  }

  let newTodo = addTodoList();
  displayTodo(newTodo);
  setLocalStorage("todoList", todoList);
  clearTodoInput();
};

const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorage = (key) => {
  return window.localStorage.getItem(key);
};

const removeLocalStorage = (key) => {
  window.localStorage.removeItem(key);
};

// 4분면에 배치
const positionTodoListItem = (todoList) => {
  todoList.filter((item) => {
    displayTodo(item);
  });
};

// todo 추가 후 입력창 초기화
const clearTodoInput = () => {
  todoInput.value = "";
  importanceCheck.checked = false;
  urgencyCheck.checked = false;
};

addTodoBtn.addEventListener("click", addAndDisplayTodo);

// 화면에 나타날 때 어느 분면에 나타낼지 분리
const displayTodo = (todo) => {
  const { id, content, importance, urgency } = todo;

  if (importance && urgency) {
    createNewTodo(id, content, quadrant1);
  }
  if (importance && !urgency) {
    createNewTodo(id, content, quadrant2);
  }
  if (!importance && urgency) {
    createNewTodo(id, content, quadrant3);
  }
  if (!importance && !urgency) {
    createNewTodo(id, content, quadrant4);
  }
};

// 추가될 투두리스트의 템플릿
const addNewItemTemplate = (id, content) => {
  return `<li id=${id} class="todo-item-list">
      <input class="todo-toggle" type="checkbox" />
      <label id=${id} class="todo-content">${content}</label>
      <button class="todo-item-remove-btn" id="${id}" onClick="removeTodo(event)">X</button>
  </li>`;
};

// 새로운 투두 추가하기
const createNewTodo = (id, content, quadrant) => {
  quadrant.insertAdjacentHTML("beforeend", addNewItemTemplate(id, content));
};

// 개별 삭제하기
const removeTodo = (e) => {
  todoList = todoList.filter((item) => item.id !== parseInt(e.target.id));
  setLocalStorage("todoList", todoList);
  e.target.parentNode.remove();
};

// 전체 삭제하기
const removeAllTodo = () => {
  const todolistItem = document.querySelectorAll(".todo-item-list");
  Array.from(todolistItem).forEach((element) => {
    element.remove();
  });

  todoList = [];
  removeLocalStorage("todoList");
};

removeAllTodoBtn.addEventListener("click", removeAllTodo);

const changeTodoTemplate = (target, id) => {
  const oldItemContent = target.closest("label").innerText;
  target.closest("li").innerHTML = modifyItemTemplate(id, oldItemContent);
};

// 더블 클릭 시 content 태그를 input으로 수정
const modifyItemTemplate = (id, oldItemContent) => {
  return `
        <input class="todo-toggle" type="checkbox" />
        <input id="${id}" class="todo-content todo-modify-content" value="${oldItemContent}"></input>
    `;
};

const changeUpdateItemTemplate = (id, content) => {
  return `
        <input class="todo-toggle" type="checkbox" />
        <label id=${id} class="todo-content">${content}</label>
        <button class="todo-item-remove-btn" id="${id}" onClick="removeTodo(event)">X</button>`;
};

// 보여지는 내용 업데이트
const updateItem = (e) => {
  const { id } = e.target.closest("input");
  const newItemContent = getSelector(".todo-modify-content").value;
  if (e.key === "Enter") {
    e.target.closest("li").innerHTML = changeUpdateItemTemplate(
      id,
      newItemContent
    );
    updateLocalTodoList(id, newItemContent);
  }
};

// 로컬스토리지 투두리스트 업데이트
const updateLocalTodoList = (id, newItemContent) => {
  todoList = todoList.map((item) => {
    if (item.id === parseInt(id)) {
      item.content = newItemContent;
      return item;
    }
    return item;
  });
  setLocalStorage("todoList", todoList);
};

const makeModifyingTodo = (e) => {
  const target = e.target;
  const { id } = target;
  changeTodoTemplate(target, id);
  //   updateTodoList(id, newItemContent);
};

// 투두리스트 내용 업데이트
const updateTodoList = (id, content) => {
  todoList.map((item) => {
    if (item.id === id) {
      item.content = content;
    }
  });
};

// 체크 시 가운데 줄 긋기
const completeTodo = (e) => {
  const { id } = e.target.closest("li");
  const { checked } = e.target.closest("input");
  if (checked) {
    e.target.closest("li").classList.add("completed");
    updateCompletedTodoList(id, checked);
  } else {
    e.target.closest("li").classList.remove("completed");
    updateCompletedTodoList(id, checked);
  }
};

const updateCompletedTodoList = (id, checked) => {
  todoList.map((item) => {
    if (item.id === parseInt(id)) {
      item.completed = checked;
      return item;
    } else return item;
  });
  setLocalStorage("todoList", todoList);
};

[...quadrantList].map((item) => {
  item.addEventListener("dblclick", makeModifyingTodo);
  item.addEventListener("keypress", updateItem);
  item.addEventListener("click", completeTodo);
});

const indexBtn = getSelector(".index-section");
const indexHideBtn = getSelector(".index-section-hide");
const todoSection = getSelector(".todo-section");

indexBtn.addEventListener("click", () => {
  if (!indexBtn.classList.contains("hide")) {
    indexBtn.classList.add("hide");
    todoSection.classList.remove("hide");
  }
});

indexHideBtn.addEventListener("click", () => {
  if (!todoSection.classList.contains("hide")) {
    indexBtn.classList.remove("hide");
    todoSection.classList.add("hide");
  }
});

checkLocalStorage();
