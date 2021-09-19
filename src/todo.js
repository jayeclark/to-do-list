function Todo({todo, index, props}){

    const {complete, remove, toggleEditForm, setEditFormData} = props;

    function handleComplete(){
        complete(index);
    }

    const checkID = "check-" + index;


    const [formDisplay, setFormDisplay] = React.useState('collapsed');

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
                    <div className="todo-title"><ParsedText value={todo.text}/></div>
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

function TodoFormEdit({save, popupFormDisplay, setPopupFormDisplay, editFormData, setEditFormData, toggleEditForm}) {
   
    const {value,type} = editFormData;

    const [disabled, setDisabled] = React.useState(true);

    const [height, setHeight] = React.useState('');

    const inputFocus = React.useRef(null);

    const handleChange = e => {
        let btnDisabled = true;
        if (e.target.value !== '') {btnDisabled = false;}
        setEditFormData({value: e.target.value, index: editFormData.index, type: editFormData.type});
        setHeight(e.target.scrollHeight);
        setDisabled(btnDisabled);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        save(value,editFormData.index);
        setEditFormData({value:'',index:'',type:''});
        setDisabled(true);
        e.target.reset();
        setPopupFormDisplay('collapsed');
    }

    React.useEffect(()=>{
        if (popupFormDisplay == 'expanded') {
            setHeight(inputFocus.current.scrollHeight);
            inputFocus.current.focus();
        }
    },[popupFormDisplay, disabled])

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
                    style={{padding:'8px',fontFamily:'inherit',fontSize:'14px',minWidth:'300px',maxWidth:'100%',height:height}}
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

function ParsedLine({snip}) {
    let tag = snip.includes('<strong>') ? 'strong' : snip.includes('<em>') ? 'em' : snip.includes('<br>') ? 'br' : snip.includes('<p>') ? 'p' : snip.includes('<code>') ? 'code' : ''
    let remove = ['<strong>','</strong>','<em>','</em>','<p>','</p>','<br>','<code>','</code>'];
    remove.forEach(x => snip = snip.replace(x,''));

    if (tag == 'strong') {
        return (
            <strong>{snip}</strong>
        )
    }
    else if (tag == 'em') {
        return (
            <em>{snip}</em>
        )
    }
    else if (tag == 'br') {
        return (
            <>{snip}<br/></>
        )
    }
    else if (tag == 'p') {
        return (
            <>{snip}<br/><br/></>
        )
    }
    else if (tag == 'code') {
        return (
            <code>{snip}</code>
        )
    }
    else if (tag == '') {
        return (
        <>{snip}</>
        )
    }

}

function ParsedText(value) {

    let text = value.value;
    let parse = false;
    const regex1 = new RegExp('\n');
    const regex2 = new RegExp('\\*');
    const regex3 = new RegExp('```');

    if (text.search(regex1) > -1 || text.search(regex2) > -1 || text.search(regex3) > -1 ) {parse = true;}

    text = text.replace(/\n\n/g,'---\n\n---');

    while (text.search(/[^\n](?=(\n)([^\n]))/) > -1) {
        console.log(text);
        text = text.replace(/[^\n](\n)(?=[^\n])/,'$&\n---');
        console.log(text);
        text = text.replace(/[^\n](?=(\n\-\-\-)([^\n]))/,'$&---');
        console.log(text);
    }

    while (text.search(/([^(\\)(\-)(\\\*\*)])(\*\*)/) > -1) {
        text = text.replace(/([^(\\)(\-)(\\\*\*)])(\*\*)/,'$1---**---');
    }

    while (text.search(/([^(\\\*)(\\)(\-)(\*)])(\*)([^\*\-])/) > -1) {
        text = text.replace(/([^(\\\*)(\\)(\-)(\*)])(\*)([^\*\-])/,'$1---*---$3');
    }

    while (text.search(/([^(\\```)(\\)(\-)])(```)/) > -1) {
        text = text.replace(/([^(\\```)(\\)(\-)])(```)/,'$1---```---');
    }

    text = text.replace(/\\(?=\n)/g,'');
    text = text.replace(/\\(?=\*)/g,'');
    text = text.replace(/\\(?=```)/g,'');

    let arr = text.split('---');

    while (arr.includes('**')) {
        let newElement = '<strong>' + arr[arr.indexOf('**')+1]+'</strong>';
        arr.splice(arr.indexOf('**'),3,newElement);
    }
    while (arr.includes('```')) {
        let newElement = '<code>' + arr[arr.indexOf('```')+1]+'</code>';
        arr.splice(arr.indexOf('```'),3,newElement);
    }
    while (arr.includes('*')) {
        let newElement = '<em>' + arr[arr.indexOf('*')+1]+'</em>';
        arr.splice(arr.indexOf('*'),3,newElement);
    }
    while (arr.includes('\n\n')) {
        let newElement = '<p>' + arr[arr.indexOf('\n\n')-1]+'</p>';
        arr.splice(arr.indexOf('\n\n')-1,2,newElement);
    }
    while (arr.includes('\n')) {
        let newElement = arr[arr.indexOf('\n')-1]+'<br>';
        arr.splice(arr.indexOf('\n')-1,2,newElement);
    }

    if (parse == false) return <>{text}</>;

    return (<>{arr.map((snip,i) => <ParsedLine snip={snip} key={i}/>)}</>)
}
