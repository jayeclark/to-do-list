
function App() {

    const [todos, setTodos] = React.useState([
        {
            text: 'Learn react',
            checkbox: String.fromCharCode(9744),
            class: "todo",
            isCompleted: false,
        },
        {
            text: 'Make lunch',
            isCompleted: false,
            checkbox: String.fromCharCode(9744),
            class: "todo",
        },
        {
            text: 'Build app',
            isCompleted: false,
            checkbox: String.fromCharCode(9744),
            class: "todo",
        }
        ]);

    const [editFormData, setEditFormData] = React.useState(
        {
            value: '',
            index: '',
        }
    )

    const addTodo = val => {
        const newTodos = [{text: val, isCompleted: false, checkbox: String.fromCharCode(9744), class: "todo",},...todos];
        setTodos(newTodos);
    }

    const [formDisplay, setFormDisplay] = React.useState('collapsed');

    const [editFormDisplay, setEditFormDisplay] = React.useState('collapsed');

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

        if (formDisplay == 'expanded') {
            setFormDisplay('collapsed')
        } else {
            setFormDisplay('expanded'); 
        }
    }

    const toggleEditForm = () => {
        if (editFormDisplay == 'expanded') {
            setEditFormDisplay('collapsed')
        } else {
            setEditFormDisplay('expanded');
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
            <div className={editFormDisplay} style={{display:'flex',flexDirection:'row'}}>
                <div className="edit-form">  
                    <TodoFormEdit 
                        save={saveTodo} 
                        editFormDisplay={editFormDisplay} 
                        setEditFormDisplay={setEditFormDisplay} 
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
                <div className={formDisplay}>
                    <TodoForm addTodo={addTodo} toggleForm={toggleForm} formDisplay={formDisplay} type='add'/>
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