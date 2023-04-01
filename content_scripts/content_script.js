const messageListener = (message,sender,sendResponse)=>{
    const {action,props} = message;
            console.log("TabMan: Inside content script message listener");
    switch(action){
        case "RENAME_TAB":
            document.title=props.name;
            sendResponse({title: document.title})
            return true
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

