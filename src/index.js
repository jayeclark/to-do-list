

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


    const addTodo = val => {
        const newTodos = [...todos, {text: val, isCompleted: false, checkbox: String.fromCharCode(9744), class: "todo",}];
        console.log(newTodos);
        setTodos(newTodos);
    }

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

    return (
        <div className="todo-list">
            {todos.map((todo,i) => <Todo key={i} todo={todo} index={i} complete={completeTodo} remove={removeTodo}/>)}
            <TodoForm addTodo={addTodo}/>
        </div>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)