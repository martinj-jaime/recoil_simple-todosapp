/*
import React from 'react'
import { 
      RecoilRoot,
      useRecoilState,
      atom,
      selector,
      useRecoilValue,
      } from 'recoil'
import './App.css';

function App() {
  return (
    <RecoilRoot>
      <TextInput />
      <Counter />
    </RecoilRoot>
  );
}

const textInputState = atom({
  key: 'textInputState',
  default: ''
})

const textInputSelector = selector({
  key: 'textInputSelector',
  get: ({ get }) => {
    const text = get(textInputState)
    return text.length
  }
})

function TextInput() {
  // El hook useRecoilState se suscribe a textInputState
  // y permite tanto leer como modificar el estado
  const [text, setText] = useRecoilState(textInputState)

  const onInputChange = input => {
    setText(input.target.value)
  }

  return(
    <div>
      <input value={text} onChange={onInputChange} />
    </div>
  )
}

function Counter() {
  // El hook useRecoilValue se suscribe a textInputSelector
  // y permite tanto leer el estado (generalmente procesado)
  const length = useRecoilValue(textInputSelector)

  return(
    <span> {length} </span>
  )
}

export default App;
*/