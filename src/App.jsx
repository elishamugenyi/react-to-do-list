import { useState,useEffect } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')

  //load items from local storage, this helps avoid loss of items on page reload
  useEffect(() => { 
    const storedItems = JSON.parse(localStorage.getItem('todoItems'))
    if (storedItems) {
      setItems(storedItems);
    }
  }, [])

  //save items to local storage whenever an item changes
  useEffect(() => {
    localStorage.setItem('todoItems', JSON.stringify(items))
  }, [items])

  //functionality to handle add item
  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      setItems([...items, { text: newItem, done: false }])
      setNewItem('')
    }
  }

  //functionality for delete item
  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((item, i) => i !== index)
    setItems(updatedItems)
  }

  //Functionality for toggle items
  const handleToggleDone = (index) => {
    const updatedItems = items.map((item, i) =>
    i === index ? { ...item, done: !item.done } : item )
    setItems(updatedItems)
  }

  return (
    < div className="App">
      <label> New Item</label>
      <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} />
      <button onClick={handleAddItem}> Add</button>
      <h1>To Do List</h1>
      {items.length === 0 ? ( 
        <p>No To DOs</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <input type="checkbox" checked={item.done} onChange={() => handleToggleDone(index)}/>
              {item.text}
              <button onClick={() => handleDeleteItem(index)}> Delete </button>
            </li>
          ))}
        </ul>
        )}
    </div>
  )
}

export default App
