import { useState } from 'react';
import tasksLogo from './TasksLogo.png';
import TextareaAutosize from 'react-textarea-autosize';

interface TaskBoardProps {
    title: string;
    id: number;
    viewMode: string;
    searchTerm: string;
  }

interface MenuProps {
    boards: TaskBoardProps[];
    isMenuOpen: boolean;
    onHandleMenuClick: () => void;
    onNewBoard: (boardTitle: string) => void;
    onSelectBoard: (id: number ) => void;
}
const SideBarMenu : React.FC<MenuProps> = ({isMenuOpen, onHandleMenuClick, boards, onNewBoard, onSelectBoard }) => {
        //Code for opening Menu
    //const [isMenuOpen, setIsMenuOpen] = useState(menuOpen);
    const [inputValue, setInput] = useState <string>("");

    const handleEnterPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' ) {
            e.preventDefault();
            onNewBoard(inputValue);
            setInput("");
        }
    }



    return (
        <>
            <div className={`sidebar${isMenuOpen ? 'open' : ''}`}>
                <div className='logoContainerMenu'>
                    <img className= "logoImage" src={tasksLogo} alt='Tasks Logo'/>
                    <h1>TasksBoard</h1>
                </div>
                
                {boards.map((boardIndex) => (
                    <button className="taskBoardSelect" onClick={()=>onSelectBoard(boardIndex.id)} >
                        <h1>
                            {boardIndex.title}
                        </h1>
                    </button>
                ))}
                <div className='newTaskBoardContainer'>
                    <TextareaAutosize className="newTaskBoardTextArea" 
                    placeholder='Add new TaskBoard' value={inputValue} 
                    onChange = {((e) => setInput (e.currentTarget.value))}
                    onKeyPress={handleEnterPress}>
                    </TextareaAutosize>
                    <button>Add</button>

                </div>
                

            </div>
            {isMenuOpen? 
            <div id="menuFadeDark" onClick={onHandleMenuClick}></div> :  
            <div id="menuFade"></div>}
        </>  
    )
}

export default SideBarMenu