const messageListener = (message,sender,sendResponse)=>{
    const {action,props} = message;
            console.log("Inside message listener");
    switch(message.action){
        case "RENAME_TAB":
            document.title=props.name;
            break;
        case "GET_TAB_TITLE":
            console.log("Sending response : ",document.title);
            sendResponse({title: document.title})
            return true
            break;
        default:
            break
    }
}


console.log("Listener attached")
chrome.runtime.onMessage.addListener(messageListener);
