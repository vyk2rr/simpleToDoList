import { useState } from 'react'
import './App.css'
import './TodoList.css'

type TodoItem = {
  title: string;
  completed: boolean;
};

type TodoList = TodoItem[];

function App() {
  const [todos, setTodos] = useState<TodoList>([
    { title: 'do laundry', completed: false},
    { title: 'do homework', completed: true},
    { title: 'do something different today', completed: false},
  ])
  const [input, setInput] = useState<string>('')

  const addTodo = () => {
    if (input.trim()) { // Prevent adding empty todos
      setTodos([...todos, { title: input, completed: false }]);
      setInput('');
    }
  };

  const toggleCompleted = (index: number) => {
    const newTodos = todos.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(newTodos);
  };

  const remove = (index: number) => {
    const newTodos = todos.slice(0, index).concat(todos.slice(index + 1))
    setTodos(newTodos);
  }

  const renderItems = () => {
    return todos.map((i, index) => (
      <li
        key={index}
        className="todo-item"
        onChange={() => toggleCompleted(index)}
      >
        <button
          onClick={() => remove(index)}
          className='remove-btn'
        >x</button>
        <input
          type="checkbox"
          checked={i.completed}
        />
        {i.title}
      </li>
    ));
  };

  return (
    <div className="todo-container">
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {renderItems()}
      </ul>
    </div>
  );
}
export default App