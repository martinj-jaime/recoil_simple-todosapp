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
      <ItemCreator />
      <TodoList />
    </RecoilRoot>
  );
}

let idUnico = 0;
const todoListState = atom({
  key: 'todoListState',
  default: []
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
/*
const todos = [
  { id: 1, text: 'Todo 1', isCompleted: false },
  { id: 2, text: 'Todo 2', isCompleted: false },
  { id: 3, text: 'Todo 3', isCompleted: true },
]
*/

function TodoList() {
  const todos = useRecoilValue(todoListState)

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

export default App;
