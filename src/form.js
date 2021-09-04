
function TodoForm({addTodo, toggleForm, inlineFormDisplay}) {

    const [value, setValue] = React.useState('');

    const [disabled, setDisabled] = React.useState(true);

    const [height, setHeight] = React.useState(0);

    const inputFocus = React.useRef(null);

    const handleChange = e => {
        let btnDisabled = true;
        if (e.target.value !== '') {btnDisabled = false;}
        setValue(e.target.value);
        setHeight(e.target.scrollHeight);
        setDisabled(btnDisabled);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue('');
        setDisabled(true);
        e.target.reset();
    }

    React.useEffect(()=>{
        if (inlineFormDisplay == 'expanded') {inputFocus.current.focus();}
    },[inlineFormDisplay, disabled])

    return (
            <form onSubmit={handleSubmit} style={{flexGrow:1}}>
            <div style={{width:'100%'}}>
            <textarea 
                id="test-input"
                ref={inputFocus}
                autoComplete="off"
                className="input" 
                value={value} 
                style={{padding:'8px',lineHeight: '1.5', backgroundColor: '#fff', fontSize:'14px',fontFamily:'inherit',maxWidth:'100%', height:height == 0 ? 38 : height}}
                placeholder="Enter a note..."
                onChange={handleChange}
                name="todo" />
            </div>
            <div className="button-wrapper">
                <div style={{flexGrow:1, width:'50%', margin:'0px 5px 0px 0px'}}>
                    <div style={{position:'relative'}}>
                        <div>
                            <button id="submitBtn" style={{width: '100%',position:'absolute'}} className="btn btn-primary btn-grow" type="submit" disabled={disabled}>Add</button>
                        </div>
                     </div>
                    
                </div>
                <div style={{position:'relative', flexGrow:1, width:'50%',margin:'0px 0px 0px 5px'}}>
                <button id="cancelBtn" className="btn btn-default btn-grow"  style={{width: '100%'}} type="button" onClick={toggleForm}>Cancel</button>
                </div>
            </div>
            </form>
        
    );
}

