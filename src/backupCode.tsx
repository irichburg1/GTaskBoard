//Regular TaskBoard no filter
/*
{taskLists.map((list) => (
    <>
    <TaskList viewMode = {viewMode} key= {list.id} Listid={list.id} title ={list.title} items={list.items} onTaskDelete={handleListDelete} >
    </TaskList>
    </>
))}


<div id= {viewMode == 'vertical' ? "addTaskListContainerVert" : "addTaskListContainerHori"} >
        <TextareaAutosize id="addTaskListTextArea" 
        placeholder = {isFocused ? 'New TaskList' : '+ add new TaskList'} 
        value={inputValue} onChange = {handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur} onKeyPress={handleEnterPress}
        ></TextareaAutosize>
        <button id="addTaskListButton" onClick={handleClick} >+</button>
</div>

//
<>
                    {filteredTaskLists.map((list) => (
                    <TaskList viewMode = {viewMode} key= {list.id} Listid={list.id} title ={list.title} items={list.items} onTaskDelete={handleListDelete} >
                    </TaskList>

                    ))}
                    </>
*/