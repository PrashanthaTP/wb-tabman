let db = {}
const commandListener = (command) =>{
    console.log("command listener",command);
    console.log(chrome.action)
    switch(command){
        case "open-popup":
            /*
             * https://github.com/GoogleChrome/developer.chrome.com/issues/204
             */
            //chrome.action.openPopup();
            break;
        default:
            break
    }
}

const messageListner = (request,sender,sendMessage) =>{
    const {action,props} = request;
    switch(action){
        case "RENAME_TAB_COMPLETE" : 
            const {tabId,tabTitle} = props;
            db[tabId] = tabTitle;  
            break;
        case "SHOW_NOTIFICATION":
            console.log(props)
            console.log()
            chrome.notifications.create('',props);
            break;
        default:
            break;
    }
}
chrome.commands.onCommand.addListener(commandListener)
chrome.runtime.onMessage.addListener(messageListner)

