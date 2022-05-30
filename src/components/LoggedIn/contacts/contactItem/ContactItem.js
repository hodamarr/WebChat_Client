function ContactItem(props){
    const formattedDate = props.lastdate ? new Intl.DateTimeFormat('en-US', { timeStyle: 'short' }).format(new Date(props.lastdate)) : '';
    return (
        <div>
            <span className="navbar-text">
                <img src="contact.png" width="40" height="40" alt=""/>
                <span style={{padding:"10px"}}>{props.id}</span>
                <span style={{float:"right", color:"gray"}}>{formattedDate}</span>
            </span>
        </div>
    );
}

export default ContactItem;
