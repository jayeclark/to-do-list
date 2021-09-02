function CardIcon(){
    return (
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16" className="icon-svg">
                <path fillRule="evenodd" d="M0 3.7 C0 2.784.784 2 1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 14H1.75A1.75 1.75 0 010 12.25v-8.5z
                m1.75-.25a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25H1.75z
                M3.5 6.25a.75.75 0 01.75-.75h7a.75.75 0 010 1.5h-7a.75.75 0 01-.75-.75z
                m.75 2.25a.75.75 0 000 1.5h7a.75.75 0 000-1.5h-7z">    
                </path>
            </svg>
    )
}

function PlusIcon(){
    return (
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="icon-svg">
                <path fillRule="evenodd" d="M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 110 1.5H8.5v4.25a.75.75 0 11-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z">
                </path>
            </svg>
    )
}

function XIcon(){
    return (
            <div style={{transform:'rotate(45deg)'}}>
                <PlusIcon />
            </div>
    )
}

function MoreIcon(){
    return (
        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="icon-svg">
             <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z">
             </path>
        </svg>
    ) 
}