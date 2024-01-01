import { useState, useEffect } from 'react';
import './App.css';
import Task from './components/Task';

function App() {
  const [edit, setEdit] = useState(false);
  const [indexEdit, setIndexEdit]=useState(-1)
  const [newTask, setNewTask] = useState({content:'', done:false});
  
  const [tasks, setTasks] = useState(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      return Array.isArray(storedTasks) ? storedTasks : [];
    } catch (error) {
      console.error('Error parsing tasks:', error);
      return [];
  }});

  useEffect(() => {
    // Save tasks to local storage whenever the tasks state changes
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function handleChange(event) {
    setNewTask({content:event.target.value, done:false});
  }

  function addTask() {
    if (newTask.content) {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTask({content:'', done:false});
    }
  }
  function deleteAllTasks() {
    if (tasks.length > 0) {
      // Remove the 'tasks' item from local storage
      localStorage.removeItem('tasks');
      setTasks([]);
    }
  }
  function deleteTask(index) {
    if (index >= 0 && index < tasks.length) {
      // Create a new array without the task at the specified index
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
    } else {
      console.error('Index out of bounds');
    }
  }
  function editTask(index) {
    setEdit(true);
    setIndexEdit(index);
    const taskToEdit = tasks[index];
    setNewTask(taskToEdit);
  }
  function saveEditedTask(index){
    setTasks((prevTasks) => {
      return prevTasks.map((task, i) => (i === index ? newTask : task));
    })
    setEdit(false)
    setIndexEdit(-1)
    setNewTask({content:'', done:false})
}
function doneOrUndoneTask(index) {
  setTasks((prevTasks) => {
    return prevTasks.map((task, i) => (i === index ? { ...task, done: !task.done } : task));
  });
}
  
  return (
    <div className=' relative w-[600px] h-[600px] bg-white border rounded-md flex flex-col items-center p-6 overflow-hidden'>
      <h2 className='text-3xl font-semibold'>To Do list</h2>
      <div className='w-full flex flex-col gap-4 mt-4'>
        <input type='text' value={newTask.content} className='w-full p-2 border border-black rounded-md outline-none' onChange={handleChange} />
        {!edit && <button className='w-full font-semibold border border-black text-white bg-black h-10 rounded-md' onClick={addTask}>
          Add task
        </button>}
        {edit && <button className='w-full font-semibold border border-black text-white bg-black h-10 rounded-md' onClick={()=>saveEditedTask(indexEdit)}>
          Edit task
        </button>}
      </div>

      {/* Display the list of tasks */}
      <div className='mt-6 w-full mb-16 overflow-auto'>
        {tasks.length > 0 &&
          tasks.map((task, index) =>  <Task key={index} content={task.content} delete={() => deleteTask(index)} edit={() => editTask(index)} doneOrUndone={()=>doneOrUndoneTask(index)} check={task.done} isDone={task.done}/>)
        }
      </div>
      {tasks.length >0 && <div className='flex justify-center bg-white z-50 absolute bottom-0 left-0 right-0'><button className='font-semibold border border-black rounded-md px-2 text-white bg-black h-10 my-4' onClick={deleteAllTasks}>Delete all tasks</button></div>}
    </div>
  );
}

export default App;



