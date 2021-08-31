function Todo({todo, index, remove, complete}){

    function handleRemove(){
        remove(index);
    }

    function handleComplete(){
        complete(index);
    }
    
    const checkID = "check-" + index;

    return (
        <div className={todo.class} key={index} id={index}><div id={checkID} onClick={handleComplete}>{todo.checkbox} {todo.text}</div><div className="remove" onClick={handleRemove}>[Remove]</div></div>
    )
}