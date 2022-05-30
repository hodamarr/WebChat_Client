import { getPic } from "../../../../users";

function getContent(type, content) {
    switch (type) {
        case "video":
            return (
                <video style={{width:300, height:200}} controls>
                    <source src={content} type="video/mp4"></source>
                </video>
            );
        case "image":
            return <img src={content} style={{width:150, height:150}} alt=""/>;
        case "audio":
            return (
                <audio controls>
                    <source src={content} type="audio/mp3"></source>
                </audio>
            );
        case "txt":
        default:
            return content;
    }
}

function MessageItem(props) {
    return (
        <span className="navbar-text">
            {props.showPicture && <img id="userPic" src={props.sent ? getPic(props.user) : "defIcon.png"} width="40" height="40"
                 style={{ float: props.sent ? "right" : "left", margin:"10px" }} alt=""/>}
            <div className="alert alert-primary" role="alert" style={{ float: props.sent ? "right" : "left", marginLeft: "10px" }}>
                {/*getContent(props.type,props.content)*/}
                {props.content}
            </div>
        </span>
    );
}

export default MessageItem;
