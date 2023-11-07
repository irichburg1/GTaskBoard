
import React, { ReactNode, useEffect, useRef } from 'react'
import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import DropDown from './DropDown';

export interface taskItem {
    id: number,
    text: string,
    complete: boolean,
    
}

interface TaskListProps {
    viewMode: string,
    Listid: number,
    title: string,
    items: taskItem[],
    children: ReactNode,
    onTaskListDelete: (id: number) => void;
    changeListTitle: (id: number, title: string)=> void;
}

const TaskList : React.FC<TaskListProps> = ({viewMode, Listid, title, items, children, onTaskListDelete, changeListTitle}) => {    
    
    
    const [todos, setTodos] = useState<taskItem[]>(() => {
        // Retrieve todos from localStorage on component initialization
        const savedTodos = localStorage.getItem(""+Listid);
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    //console.log("this list's id:" + Listid);

    useEffect(() => {
        // Save todos to localStorage whenever the todos state changes
        localStorage.setItem(""+Listid, JSON.stringify(todos));
    }, [todos]);

    const handleDelete = (id: number) => {
        setTodos((todos) => todos.filter((todo) => todo.id != id));
        items = todos;
        /*console.log ("The tasks in " + title + ":")
        items.map((item) => {
            console.log (item.text);
        });*/
    
    }

    const handleDeleteList = (() => {
        setTodos((todos) => todos.filter((todo) => todo.id == 0));
        onTaskListDelete(Listid);
        Listid = 0;
        
    })

    

    const handleToggle = (id: number) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id == id) {
                    console.log(todo.complete);

                    return {...todo, complete: !todo.complete}
                }
                return todo

            })
        );

    };

    

    const [inputValue, setInput] = useState <string>("");

    const handleClick = () => {
        const newTodo: taskItem = {
            id: Date.now(),
            text: inputValue,
            complete: false
        };
        setTodos ([...todos, newTodo]);
        setInput ("");
        items = todos;
        console.log ("The tasks in " + title + ":")
        items.map((item) => {
            console.log (item.text);
        });
    
    }
    const handleEnterPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' ) {
            e.preventDefault();
            handleClick();

        }
    }

    const handleInputChange = (id: number, value: string) => {
        // Handle input change and update the todo text
        const updatedTodos = todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, text: value };
          }
          return todo;
        });
        setTodos(updatedTodos);
    };

    const options = ['Rename List', 'Delete List'];

    const titleAreaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleRenameClick = () => {
        if (titleAreaRef.current) {
            titleAreaRef.current.focus();
        }
    }
    
    const [taskListTitle, setTaskListTitle] = useState<string>(title+"");

    const changeListTitleD = (newTitle: string) => {
        setTaskListTitle(newTitle);
        changeListTitle(Listid, taskListTitle);
      };

  return (
    
        <div className = {viewMode === 'vertical' ? "taskListVert": "taskListHori"}>
            {children}
            <div className='listTitleContainer'>
                    {/*<h2 className='listTitle'>{title}</h2>*/}
                    <TextareaAutosize 
                    className="task-item-input"
                    placeholder="List Title" ref = {titleAreaRef}
                    value={taskListTitle}
                    onChange={(e) => changeListTitleD(e.target.value)}
                    onBlur={(e)=>changeListTitleD(e.target.value)}
                    ></TextareaAutosize>
                    <DropDown options={options} handleDeleteList={handleDeleteList} onRenameClick = {handleRenameClick}></DropDown>
            </div>
            <div className="newTaskContainer" >
                
                <button onClick= {handleClick} className= "addTaskButton">+</button>
                <TextareaAutosize className = "newTaskTextArea" onKeyPress= {handleEnterPress} placeholder = "Add a task" value={inputValue} onChange = {((e) => setInput (e.currentTarget.value))}></TextareaAutosize>
            </div>
            <ul>
                {todos.map((todo) => (
                    
                        <li key={todo.id} >
                            <input type="checkbox" className="custom-checkbox" onClick={()=>handleToggle(todo.id)} checked={todo.complete}/>
                            {/*<span className='text' style={{ textDecoration: todo.complete ? 'line-through' : 'none' }}>{todo.text}</span>*/}
                            <TextareaAutosize className='task-item-input' placeholder = {"Task"} 
                            value={todo.text} onChange={(e) => handleInputChange(todo.id, e.target.value)}
                            style={{ textDecoration: todo.complete ? 'line-through' : 'none' }}></TextareaAutosize>
                            <button className='deleteTaskButton' onClick={() => handleDelete(todo.id)}>
                            x
                            </button>
                        </li>
                        
                ))}
                
                
            </ul>
        </div>
    

  )
}

export default TaskList