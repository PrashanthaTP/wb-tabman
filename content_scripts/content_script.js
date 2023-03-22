const messageListener = (message,sender,sendResponse)=>{
    const {action,props} = message;
    switch(message.action){
        case "RENAME_TAB":
            document.title=props.name;
            break;
        case "GET_TAB_TITLE":
            sendResponse({title: document.title})
            break;
        default:
            break
    }
}


chrome.runtime.onMessage.addListener(messageListener);
