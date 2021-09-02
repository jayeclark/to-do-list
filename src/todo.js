function Todo({todo, index, props}){

    const {complete, remove, save, toggleEditForm, setEditFormData} = props;

    function handleComplete(){
        complete(index);
    }

    const checkID = "check-" + index;


    const [formDisplay, setFormDisplay] = React.useState('collapsed');

    const toggleForm = () => {

        if (formDisplay == 'expanded') {
            setFormDisplay('collapsed')
        } else {
            setFormDisplay('expanded'); 
        }
    }

    const [menuDisplay, setMenuDisplay] = React.useState('collapsed');

    const toggleMoreMenu = () => {
        if (menuDisplay == 'expanded') {
            setMenuDisplay('collapsed') 
        }
        else {
            setMenuDisplay('expanded')
        }
    }

    return (
        <div className={todo.class} key={index} id={index}>
            <div id={checkID} onClick={handleComplete} className="card-icon"><CardIcon /></div>
            <div style={{flexGrow:1}}>
                <div style={{display:'flex',position:'relative',flexWrap:'nowrap',width:'100%'}} className={formDisplay == 'collapsed' ? 'expanded' : 'collapsed'}>
                    <div className="todo-title">{todo.text}</div>
                    <div className="remove" onClick={toggleMoreMenu}><MoreIcon /></div>
                    <div className={menuDisplay} style={{zIndex:1000,position:'absolute',top:'20px',right:'-16px'}}>
                        <MoreMenu remove={remove} toggleEditForm={toggleEditForm} index={index} setMenuDisplay={setMenuDisplay} value={todo.text} type='note' setEditFormData={setEditFormData}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

function MoreMenu({remove, toggleEditForm, index, value, type, setMenuDisplay, setEditFormData}) {

    const handleEdit = () => {
        setEditFormData({value,index,type});
        toggleEditForm();
        setMenuDisplay('collapsed');
    }

    const handleDelete = () => {
        remove(index);
        setMenuDisplay('collapsed');
    }

    return (
            
            <div className="menu">
                {type == 'note' ? <div className="menu-item" style={{color: 'lightgray',cursor:'not-allowed'}}>Add timer</div> : null}
                <div className="menu-item" onClick={handleEdit}>Edit {type}</div>
                <div className="menu-item" onClick={handleDelete}>Delete {type}</div>
            </div>
    )
}

function TodoFormEdit({save, editFormDisplay, setEditFormDisplay, editFormData, setEditFormData, toggleEditForm}) {
   
    const {value,type} = editFormData;

    const [disabled, setDisabled] = React.useState(true);

    const inputFocus = React.useRef(null);

    const handleChange = e => {
        let btnDisabled = true;
        if (e.target.value !== '') {btnDisabled = false;}
        setEditFormData({value: e.target.value, index: editFormData.index});
        setDisabled(btnDisabled);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        save(value,editFormData.index);
        setEditFormData({value:'',index:''});
        setDisabled(true);
        e.target.reset();
        setEditFormDisplay('collapsed');
    }

    React.useEffect(()=>{
        if (editFormDisplay == 'expanded') {inputFocus.current.focus();}
    },[editFormDisplay, disabled])

    return (
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
            <div className="edit-todo">
                <div style={{borderRadius: '10px 10px 0px 0px', backgroundColor:'#F6f8fa',borderBottom:'1px solid rgba(186,188,190,0.4)',margin:'-16px -16px 0px -16px',padding:'16px',fontSize:'14px',fontWeight:'bold',display:'flex',width:'100%'}}>
                    <div style={{flexGrow:1}}>Edit {type}</div><div style={{flexGrow:0}} onClick={toggleEditForm}><XIcon /></div>
                </div>
                <div style={{padding:'16px 0px 8px 0px',fontSize:'14px'}}><strong>{type.charAt(0).toUpperCase()+type.slice(1)}</strong></div>
                <form onSubmit={handleSubmit} style={{flexGrow:1}}>
                <div style={{width:'100%'}}>
                <textarea 
                    type="text" 
                    id="test-input"
                    ref={inputFocus}
                    autoComplete="off"
                    className="input" 
                    style={{padding:'8px',fontFamily:'inherit',fontSize:'14px',minWidth:'300px',maxWidth:'100%'}}
                    value={editFormData.value} 
                    onChange={handleChange}
                    name="todo" />
                </div>
                <div className="button-wrapper">
                    <div style={{flexGrow:1, width:'50%', margin:'0px 5px 0px 0px'}}>
                        <div style={{position:'relative'}}>
                            <div>
                                <button id="submitBtn" style={{width: '100%', position:'absolute'}} className="btn btn-primary btn-grow" type="submit" disabled={disabled}>Save {type}</button>
                            </div>
                        </div>
                        
                    </div>
                    <div style={{position:'relative', flexGrow:1, width:'50%',margin:'0px 0px 0px 5px'}}>
                    <button id="cancelBtn" className="btn btn-default btn-grow"  style={{width: '100%'}} type="button" onClick={toggleEditForm}>Cancel</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    );

}