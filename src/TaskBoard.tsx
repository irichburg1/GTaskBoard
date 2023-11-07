
    import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
    import TaskList from './TaskList'
    //import { taskItem } from './TaskList'
    import TextareaAutosize from 'react-textarea-autosize';
    import DropDown from './DropDown';

    interface taskItem {
        id: number,
        text: string,
        complete: boolean,
        
    }
    
    interface taskList {
        id: number,
        title: string,
        items: taskItem[],    
    }
    interface TaskBoardProps {
        title: string;
        id: number;
        viewMode: string;
        searchTerm: string;
        deleteTaskBoard: (id: number) => void;
        changeBoardTitle: (id: number, title: string)=> void;
    }

    const TaskBoard : React.FC<TaskBoardProps> = ({viewMode, searchTerm, id, title, deleteTaskBoard, changeBoardTitle}) => {
    
    //Code related to saving and loading lists from local storage
        const [taskLists, setTaskLists] = useState<taskList[]>(() => {
            // Retrieve Todo lists from localStorage on component initialization
            const savedTaskLists = localStorage.getItem(''+id);
            return savedTaskLists ? JSON.parse(savedTaskLists) : [];
        });

        useEffect(() => {
            // Save todo lists to localStorage whenever the todos state changes
            localStorage.setItem(''+id, JSON.stringify(taskLists));
        }, [taskLists]);


    //Code related to deleting a task list
        const handleListDelete = (id: number) => {
            setTaskLists((taskLists) => taskLists.filter((list) => list.id != id))
            localStorage.setItem(''+id, JSON.stringify(taskLists));
            console.log('TaskList deleted in TaskBoard');

    };
    //code related to adding a new task list to the existing array of tasklists
        
        
        
        const [inputValue, setInput] = useState <string>("");
        const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
            setInput(e.target.value);
        };
        const [isFocused, setIsFocused] = useState(Boolean);
        const handleClick = () => {
            
            const newTaskList: taskList = {
                id: Date.now(),
                title: inputValue,
                items: [],
            }

            setTaskLists ([...taskLists, newTaskList]);
            setInput("");

        }
        const handleEnterPress = (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' ) {
                e.preventDefault();
                handleClick();

            }
        }

        
        //code for providing search results based on tasklist title
        let filteredTaskLists = taskLists.filter((list) =>
        list.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        //Code for providing search results based on tasks text

        let [matchingTaskLists, setMatchingTaskLists] = useState<taskList[]>([]);

        useEffect(() => {
            if (filteredTaskLists.length === 0 && searchTerm != '') {
                let listMatches = 0;
                //matchingTaskLists = [];
                matchingTaskLists = [];

                taskLists.forEach((ListIndex) => {
                    if (matchingTaskLists.includes (ListIndex)) {
                        setMatchingTaskLists([...matchingTaskLists.filter((item) => item.id !== ListIndex.id)])
                    }

                    let countMatches = 0;

                    const savedTodos = localStorage.getItem(""+ListIndex.id);//savedTodos is the file for containing the list's taskItem values.

                    if (savedTodos) {//if savedTodos exists
                            let parsedTodos: taskItem[] = JSON.parse(savedTodos);//parse the values from the file into the format of taskItems
                            
                            parsedTodos.forEach((todo) => {//for each todo task
                                if (todo.text.toLowerCase().includes(searchTerm.toLowerCase())) {//if the text matches the search
                                    countMatches++;
                                }
                            })
                    }

                    console.log("There are " +countMatches +" matches in " + ListIndex.title);
                        
                    if (countMatches >= 1) {
                        listMatches++;
                    }
                    countMatches = 0;
                    if (listMatches >= 1) {
                        matchingTaskLists.push(ListIndex);
                        //setMatchingTaskLists([...new Set(matchingTaskLists), ListIndex]);

                        listMatches = 0;
                    } 
                })
                
                setMatchingTaskLists([...new Set(matchingTaskLists)]);
                    
            }

            
        }, [searchTerm]);

        useEffect(() =>{
            matchingTaskLists.splice(0, matchingTaskLists.length)

        }, [searchTerm == ''])
        
        const onDeleteBoard = () => {
            deleteTaskBoard(id)
        }

        const options = ['Rename Board', 'Delete Board'];

        

        console.log("length of matching task Lists: " + matchingTaskLists.length);
        //console.log("the number of lists: " +listCount);
        
/*
        if (filteredTaskLists.length == 0) {

            //searchTitleIsCorrect = false;
            filteredTaskLists = taskLists.filter((list) =>
            list.items.filter((taskItem) => {
                taskItem.text.toLowerCase().includes(searchTerm.toLowerCase());
            })
        ); 

        } else {
            //searchTitleIsCorrect = true;
        }*/

        //console.log ("The length of filtered tasks Lists is:" +filteredTaskLists.length);

        const changeListTitle = ((id: number, Ltitle: string) => {
            const updatedLists = taskLists.map((list) => {
                if (list.id === id) {
                  return { ...list, title: Ltitle };
                }
                return list;
              });
              setTaskLists(updatedLists);
        })

        // Change TaskBoard Title
        
        let titleAreaRef = useRef<HTMLTextAreaElement | null>(null);

        const handleRenameClick = () => {
            if (titleAreaRef.current) {
                titleAreaRef.current.focus();
            }
        }
        
        const [taskBoardTitle, setTaskBoardTitle] = useState<string>(title+"");

        const changeBoardTitleD = (newTitle: string) => {
            setTaskBoardTitle(newTitle);
            changeBoardTitle(id, taskBoardTitle);
        };

        const handleEnterPressTitle = (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' && titleAreaRef.current ) {
                e.preventDefault();
            }
        }

        const onNewListFocus = () => {
            setIsFocused(!isFocused);
        }
        

        return (
            <div id = {viewMode === 'vertical' ? "main-containerVert": "main-containerHori"}>
                {viewMode === 'vertical' 
            ?  
            <div id="boardTitleContainerVert">
                {/*<h1 className="boardTitleVert">{title}</h1>*/}
                <TextareaAutosize 
                    className="task-item-input"
                    placeholder="List Title" ref = {titleAreaRef}
                    value={taskBoardTitle}
                    onChange={(e) => changeBoardTitleD(e.target.value)}
                    onBlur={(e)=>changeBoardTitleD(e.target.value)} onKeyPress= {handleEnterPressTitle}
                    ></TextareaAutosize>
                <DropDown options={options} handleDeleteList={onDeleteBoard} onRenameClick = {handleRenameClick}></DropDown>
            </div>
            :
            <div id="boardTitleContainerHori">
                <h1 className="boardTitleHori">{title}</h1>
                <button id="optionsButtonGray"></button>
            </div>
            }
            {searchTerm == ''
                    ?   <>
                            {taskLists.map((list) => (
                                <>
                                <TaskList viewMode = {viewMode} key= {list.id} Listid={list.id} 
                                title ={list.title} items={list.items} onTaskListDelete={handleListDelete}
                            changeListTitle = {changeListTitle}  >
                                </TaskList>
                                </>
                            ))}
                            

                            <div id= {viewMode == 'vertical' ? "addTaskListContainerVert" : "addTaskListContainerHori"} >
                                    <TextareaAutosize id="addTaskListTextArea" 
                                    placeholder = {isFocused ? 'New TaskList' : '+ add new TaskList'} 
                                    value={inputValue} onChange = {handleInputChange} onFocus={onNewListFocus}
                                    onBlur={onNewListFocus}
                                    onKeyPress={handleEnterPress}
                                    ></TextareaAutosize>
                                    {isFocused ?
                                    <button id="addTaskListButton" onClick={handleClick} >+</button> :
                                    <></>
                                    }
                            </div>
                        </>

                    :   <>
                        {matchingTaskLists.length > 0 
                        ?<>
                        {matchingTaskLists.map((list) => (
                        <TaskList viewMode = {viewMode} key= {list.id} Listid={list.id} 
                        title ={list.title} items={list.items} onTaskListDelete={handleListDelete}
                        changeListTitle = {changeListTitle} >
                        </TaskList>

                        ))}
                        </>
                        :<>
                        {filteredTaskLists.map((list) => (
                        <TaskList viewMode = {viewMode} key= {list.id} Listid={list.id} 
                        title ={list.title} items={list.items} onTaskListDelete={handleListDelete} 
                        changeListTitle = {changeListTitle}>
                        </TaskList>

                        ))}
                        </>
                        }
                        </>


            }
                
                
            
                
            </div>
        )
    }

    export default TaskBoard