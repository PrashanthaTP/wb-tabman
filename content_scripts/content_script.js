const messageListener = (message)=>{
    const {action,props} = message;
    switch(message.action){
        case "RENAME_TAB":
            document.title=props.name;
            break;
        default:
            break

    }
}


chrome.runtime.onMessage.addListener(messageListener);
