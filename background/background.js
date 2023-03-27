const tabStatus_t = {
    unloaded: "unloaded",
    loading: "loading",
    complete: "complete",
}

let db = {}
const debug = (msg) => {
    console.log(msg)
}
const commandListener = (command) => {
    console.log("command listener", command);
    console.log(chrome.action)
    switch (command) {
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

const messageListner = (request, sender, sendMessage) => {
    const { action, props } = request;
    switch (action) {
        case "RENAME_TAB_COMPLETE":
            const { tabId, tabTitle } = props;
            debug(`db updated : ${tabTitle}`)
            db[tabId] = tabTitle;
            break;
        case "SHOW_NOTIFICATION":
            console.log(props)
            console.log()
            chrome.notifications.create('', props);
            break;
        default:
            break;
    }
}

const tabUpdatedListener = (tabId, changeInfo, tab) => {
    console.log(changeInfo.status)
    if (changeInfo.status !== tabStatus_t.complete) {
        return;
    }
    console.table(db)
    if (tabId in db) {
        console.log(`setting title ${db[tabId]}`)
        chrome.scripting.executeScript({
            target: {
                tabId: tab.id,
            },
            func: () => {
                document.title = db[tabId]
            }
        }
        )
        //tab.title = db[tabId]; //doesn't work
    }
    console.log(`original tabId : ${tabId}`)
    console.log(`new tabId : ${tab.id}`)
    db[tab.id] = db[tabId];// use the new tab id (may or may not be same as tabId)
    delete db[tabId];
}

chrome.commands.onCommand.addListener(commandListener)
chrome.runtime.onMessage.addListener(messageListner)
chrome.tabs.onUpdated.addListener(tabUpdatedListener)

