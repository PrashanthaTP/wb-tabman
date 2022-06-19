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
chrome.commands.onCommand.addListener(commandListener)
