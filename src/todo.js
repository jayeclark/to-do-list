function Todo({todo, index, remove, complete}){

    function handleRemove(){
        remove(index);
    }

    function handleComplete(){
        complete(index);
    }
    
    const checkID = "check-" + index;

    return (
        <div className={todo.class} key={index} id={index}>
            <div id={checkID} onClick={handleComplete} className="card-icon"><CardIcon /></div>
            <div className="todo-title">{todo.text}</div>
            <div className="remove" onClick={handleRemove}><MoreIcon /></div>
        </div>
    )
}
