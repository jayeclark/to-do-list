
function App() {

    const [todos, setTodos] = React.useState([
        {
            text: 'Add cards to this board to track your to-do items for the day.',
            checkbox: String.fromCharCode(9744),
            class: "todo",
            isCompleted: false,
        },
        {
            text: 'Cards accept basic markdown formatting: **bold**, *italics*, line breaks (shift + enter), and ```code snippets```.',
            isCompleted: false,
            checkbox: String.fromCharCode(9744),
            class: "todo",
        },
        {
            text: 'To remove a card from the list, click on the three dots at the upper right of the card.',
            isCompleted: false,
            checkbox: String.fromCharCode(9744),
            class: "todo",
        }
        ]);

    const [editFormData, setEditFormData] = React.useState(
        {
            value: '',
            index: '',
            type: '',
        }
    )

    const addTodo = val => {
        const newTodos = [{text: val, isCompleted: false, checkbox: String.fromCharCode(9744), class: "todo",},...todos];
        setTodos(newTodos);
    }

    const [inlineFormDisplay, setInlineFormDisplay] = React.useState('collapsed');

    const [popupFormDisplay, setPopupFormDisplay] = React.useState('collapsed');

    const removeTodo = index => {
        let temp = [...todos];
        temp.splice(index,1);
        setTodos(temp);
    }

    const completeTodo = index => {
        let temp = [...todos];
        if (temp[index].checkbox == String.fromCharCode(9744)) {
            temp[index].checkbox = String.fromCharCode(9745);
            temp[index].class = "todo completed";
        }
        else {
            temp[index].checkbox = String.fromCharCode(9744);
            temp[index].class = "todo";
        }
        setTodos(temp);
    }

    const saveTodo = (value,index) => {
        let temp = [...todos];
        temp[index].text = value;
        setTodos(temp);
    }

    const toggleForm = () => {

        if (inlineFormDisplay == 'expanded') {
            setInlineFormDisplay('collapsed')
        } else {
            setInlineFormDisplay('expanded'); 
        }
    }

    const toggleEditForm = () => {
        if (popupFormDisplay == 'expanded') {
            setPopupFormDisplay('collapsed')
        } else {
            setPopupFormDisplay('expanded');
        }
    }

    const todoProps = {
        complete: completeTodo,
        remove: removeTodo,
        save: saveTodo,
        toggleEditForm: toggleEditForm,
        setEditFormData: setEditFormData,
    }

    return (
        <div>
            <div className={popupFormDisplay} style={{display:'flex',flexDirection:'row'}}>
                <div className="edit-form">  
                    <TodoFormEdit 
                        save={saveTodo} 
                        popupFormDisplay={popupFormDisplay} 
                        setPopupFormDisplay={setPopupFormDisplay} 
                        editFormData={editFormData}
                        setEditFormData={setEditFormData}
                        toggleEditForm={toggleEditForm} 
                    />
                </div>
            </div>
            <div className="todo-list">
                <div className="column-title-container">
                    <div className="counter"><strong>{todos.length}</strong></div>
                    <div className="column-title"><strong>To do</strong></div>
                    <div className="column-icon" onClick={toggleForm}><PlusIcon/></div>
                    <div className="column-icon"><MoreIcon/></div>
                </div>
                <div className={inlineFormDisplay}>
                    <TodoForm addTodo={addTodo} toggleForm={toggleForm} formDisplay={inlineFormDisplay} type='add'/>
                </div>
                {todos.map((todo,i) => <Todo props={todoProps} todo={todo} key={i} index={i} />)}
            </div>
        </div>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)