import { useEffect, useState } from 'react';
import TaskbarHeader from './TaskbarHeader';
import TaskBoard from './TaskBoard';
import SideBarMenu from './SideBarMenu';
import './App.css';

export interface TaskBoardProps {
  title: string;
  id: number;
  viewMode: string;
  searchTerm: string;
}

const App: React.FC = () => {
//code for handling viewMode
  const [viewMode, setViewMode] = useState <string> (() => {
    // Retrieve Todo lists from localStorage on component initialization
    const currentViewMode = localStorage.getItem('viewState');
    return currentViewMode ? JSON.parse(currentViewMode) : "horizontal";
  });
  //console.log ("The current view mode is " + viewMode);

  const handleViewModeToggle = () => {
    setViewMode((prevMode) => (prevMode === "horizontal" ? "vertical" : "horizontal"));
    //console.log ("The current view mode is " + viewMode);
  };

  useEffect (() => {
    localStorage.setItem('viewState', JSON.stringify(viewMode));
    
  })
//code for handling list search
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchTermChange = (text: string) => {
    setSearchTerm(text);
    //console.log("the current search term is "+ text)
  }

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick= () => {
    setMenuOpen(!menuOpen);
  }

  const [boards, setBoards] = useState<TaskBoardProps[]>(() => {
    const savedTaskLists = localStorage.getItem('MyTaskBoards');
    return savedTaskLists ? JSON.parse(savedTaskLists) : [];
  });

  useEffect(() => {
    // Save todo lists to localStorage whenever the todos state changes
    localStorage.setItem('MyTaskBoards', JSON.stringify(boards));
  }, [boards]);

  useEffect (()=>{
      boards[0] = {id: 1, title: "Main Board", viewMode: viewMode, searchTerm: '' }
  },[boards])


  let [selectedBoardNum, setSelectedBoardNum] = useState( () => {
    const recentBoard = localStorage.getItem('SavedBoard');
    return recentBoard ? JSON.parse(recentBoard) : 1;
  });

  useEffect(() => {
    // Save todo lists to localStorage whenever the todos state changes
    localStorage.setItem('SavedBoard', JSON.stringify(selectedBoardNum));
  }, [selectedBoardNum]);

  const handleChooseBoard = ((id: number) => {
    setSelectedBoardNum(id);
    handleMenuClick();
  });

  useEffect (() => {
    if (!selectedBoardNum) {
      setSelectedBoardNum(1);
    }
  })
  
  const addTaskBoard = (newTitle: string ) => {
    const newBoard: TaskBoardProps = {
      title: newTitle,
      id: Date.now(),
      viewMode: viewMode,
      searchTerm: searchTerm,
    };
    setBoards([...boards, newBoard]);
    handleChooseBoard(newBoard.id);
  };

  const deleteTaskBoard = (id: number ) => {
    if (id=== 1) {
      console.log("Cannot Delete Main Board.");
    } else {
      const filteredTaskBoards = boards.filter ((board) => board.id != id);
      setBoards(filteredTaskBoards);
      console.log("TaskBoard Deleted.")
    }
  }

  const changeBoardTitle = ((id: number, Ltitle: string) => {
    if (id === 1) {
      console.log("Cannot Change Main Board Name")
    } else {
      const updatedBoards = boards.map((currentBoard) => {
        if (currentBoard.id === id) {
          return { ...currentBoard, title: Ltitle };
        }
        return currentBoard;
      });
      setBoards(updatedBoards);
    }
    
})


  return (
    <div className='App'>
      
      <SideBarMenu isMenuOpen={menuOpen} onHandleMenuClick={handleMenuClick} 
      boards={boards} onNewBoard={addTaskBoard} onSelectBoard = {handleChooseBoard}
      ></SideBarMenu>
      
      <TaskbarHeader onViewModeToggle={handleViewModeToggle} viewMode={viewMode} 
          onSearchTermChange={handleSearchTermChange} searchTerm={searchTerm}
          onHandleMenuClick={handleMenuClick} />
      
      {boards.map((boardIndex) => (
        boardIndex.id == selectedBoardNum ? 
        <TaskBoard viewMode = {viewMode} searchTerm = {searchTerm} title={boardIndex.title} id={boardIndex.id} deleteTaskBoard = {deleteTaskBoard} changeBoardTitle={changeBoardTitle} />
        : <></>
      ))}
    </div>
    
       
  )
}

export default App
