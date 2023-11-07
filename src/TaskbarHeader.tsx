import React, { useState } from 'react';
import tasksLogo from './TasksLogo.png';
import search from './search.png';


interface TaskbarHeaderProps {
  onViewModeToggle: () => void;
  viewMode: string;
  onSearchTermChange: (searchItem: string) => void;
  searchTerm: string;
  onHandleMenuClick: () => void;
}
const TaskbarHeader : React.FC <TaskbarHeaderProps> = ({ onViewModeToggle, viewMode, onSearchTermChange, onHandleMenuClick}) => {
//Searchbar Focus
  const [isFocused, setIsFocused] = useState(Boolean);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
      setIsFocused(false);
    };
//Dropdown Menu Code
  //const [selectedOption, setSelectedOption] = useState<string | null>(null);





  return (
      
      <div className='navBar'>
        <div className='logoContainer'>
          <button id= "menuButton" onClick={onHandleMenuClick}/>
          <img className= "logoImage" src={tasksLogo} alt='Tasks Logo'/>
          <h1>TasksBoard</h1>
        </div>
        <div id={isFocused ? "searchBoxHighlighted" : "searchBox" }>
          <img className="searchIcon" src={isFocused ? search : search  } alt='search icon'/>
          <input id="searchBar" onFocus={handleFocus} onBlur={handleBlur} placeholder={isFocused? "Search": "Search"}
          onChange = {(e) => onSearchTermChange(e.target.value)}/>          
          
        </div>
        <div className='navbarButtonsContainer'>
          <button className={viewMode === 'vertical' ? 'columnButton' : 'rowButton'} onClick ={onViewModeToggle}></button>
        </div>
      </div> 
      
      
    
  );
}

export default TaskbarHeader