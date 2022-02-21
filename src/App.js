import React, { useState } from 'react'
import { 
      RecoilRoot,
      useRecoilState,
      useSetRecoilState,
      useRecoilValue,
      atom,
      selector,
      } from 'recoil'
import './App.css';

// App //
function App() {
  return (
    <RecoilRoot>
      <TodoFilter />
      <ItemCreator />
      <TodoList />
    </RecoilRoot>
  );
}

//        ATOMS       //
let idUnico = 0;
const todoListState = atom({
  key: 'todoListState',
  default: []
})
const todoFilterState = atom({
  key: 'todoFilterState',
  default: 'all'
})
//      SELECTORS     //
const todoFilterSelector = selector({
  key: 'todoFilterSelector',
  get: ({ get }) => {
    const list = get(todoListState)
    const filter = get(todoFilterState)
    switch(filter) {
      case 'done':  return list.filter(i => i.isCompleted)
      case 'notDone': return list.filter(i => !i.isCompleted)
      default: return list // all
    }
  }
})


// CREATOR //
function ItemCreator() {
  const [text, setText] = useState('')
  // const [newTodo, setNewTodo] = useRecoilState(todoListState)
  const setNewTodo = useSetRecoilState(todoListState)

  const onChangeText = e => {
    setText(e.target.value)
  }

  const onClick = () => {
    setNewTodo(oldTodoList => {
      return [ 
      ...oldTodoList,
      { id: idUnico++, text, isCompleted: false  }
      ]
    })
    setText('')
  }

  return(
    <div>
      <input value={text} onChange={onChangeText} />
      <button onClick={onClick} >Agregar</button>
    </div>
  )
}

// LIST //
function TodoList() {
  const todos = useRecoilValue(todoFilterSelector)
  return(
    <div>
      {
        todos.map(i => (<TodoItem {...i} />))
      }
    </div>
  )
}

// ITEM //
function changeItem(id, todoList, changedItem) {
  const index = todoList.findIndex(i => i.id === id)
  return [
    ...todoList.slice(0, index), 
    changedItem, 
    ...todoList.slice(index + 1, todoList.length)
  ]
}

function deleteItem(id, todoList) {
  const index = todoList.findIndex(i => i.id === id)
  return [
    ...todoList.slice(0, index), 
    ...todoList.slice(index + 1, todoList.length)
  ]
}

function TodoItem({ id, text, isCompleted }) {
  const [todoList, setTodoList] = useRecoilState(todoListState)

  const onChangeTodoItem = e => {
    let textValue = e.target.value
    const changedItem = {
      id,
      text: textValue,
      isCompleted 
    }
    setTodoList(changeItem(id, todoList, changedItem))
  }

  const onToggleCompleted = e => {
    const changedItem = {
      id,
      text,
      isCompleted: !isCompleted 
    }
    setTodoList(changeItem(id, todoList, changedItem))
  }

  const onClickDelete = () => {
    setTodoList(deleteItem(id, todoList))
  }

  return(
    <div key={id}>
      <input type="text" value={text} onChange={onChangeTodoItem} />
      <input type="checkbox" value={isCompleted} onChange={onToggleCompleted} />
      <button onClick={onClickDelete} >x</button>
    </div>
  )
}

// FILTER //
function TodoFilter() {
  const [filterState,setFilterState] = useRecoilState(todoFilterState)

  const onSelectedItem = e => {
    const { value } = e.target
    console.log(value)
    setFilterState(value)
  }

  return(
    <div>
      Filtro:
      <select value={filterState} onChange={onSelectedItem} >
        <option value="all">All</option>
        <option value="done">Done</option>
        <option value="notDone">Not Done</option>
      </select>
    </div>
  )
}

export default App;
