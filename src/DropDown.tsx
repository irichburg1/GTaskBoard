import React, { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

interface DropdownProps {
    options: string[];
    handleDeleteList: () => void;
    onRenameClick: () => void;
}
const DropDown: React.FC<DropdownProps> = ({options, handleDeleteList, onRenameClick}) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false); // Close the dropdown if the click is outside
          }
    };

    useEffect (() => {
        if (isDropdownOpen) {
            document.addEventListener('click', handleClickOutside);
          } else {
            document.removeEventListener('click', handleClickOutside);
          }
      
          return () => {
            document.removeEventListener('click', handleClickOutside);
          };
    }, [isDropdownOpen]);

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
    }

    if (selectedOption == 'Delete List') {
        handleDeleteList();
        setSelectedOption(null);

    }

    if (selectedOption == "Rename List") {
        onRenameClick();
        setSelectedOption(null);
    }

    if (selectedOption == 'Delete Board') {
        handleDeleteList();
        setSelectedOption(null);
    }

    if (selectedOption == "Rename Board") {
        onRenameClick();
        setSelectedOption(null);
    }



    return (
        <div className='dropdown-list-container' ref={dropdownRef}>
            <button id="optionsButtonWhite"onClick={() => setIsDropdownOpen(!isDropdownOpen)}></button>
            {isDropdownOpen && (
                <>
                    <div className='dropdown-list-corner'></div>
                    <ul className="dropdown-list">
                    {options.map((option) => (
                    <li className='liDropdown'key={option} onClick={() => handleOptionSelect(option)}>
                    {option}
                    </li>
                    ))}
                    </ul>
                </>
            )}
        </div>
  )
}

export default DropDown