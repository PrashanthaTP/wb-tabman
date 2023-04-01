console.log("TabMan: Background script started");
const tabStatus_t = {
    unloaded: "unloaded",
    loading: "loading",
    complete: "complete",
};

let db = {};
const debug = (msg) => {
    console.log(msg);
};
const commandListener = (command) => {
    console.log("command listener", command);
    console.log(chrome.action);
    switch (command) {
        case "open-popup":
            /*
             * https://github.com/GoogleChrome/developer.chrome.com/issues/204
             */
            //chrome.action.openPopup();
            break;
        default:
            break;
    }
};

const messageListener = (request, sender, sendMessage) => {
    debug("TabMan: Inside runtime message listener");
    const { action, props } = request;
    switch (action) {
        case "TEST_BG_LISTENER":
            debug("TabMan: Inside Test case");
            break;
        case "RENAME_TAB_COMPLETE":
            const { tabId, tabTitle } = props;
            debug(`db updated : ${tabTitle}`);
            db[tabId] = tabTitle;
            return true//return true important
            break;
        case "SHOW_NOTIFICATION":
            console.log(props);
            chrome.notifications.create("", props);
            return true//return true important
            break;
        default:
            break;
    }
};

const tabUpdatedListener = (tabId, changeInfo, tab) => {
    if (changeInfo.status !== tabStatus_t.complete) {
        return;
    }
    console.table(db);
    if (tabId in db) {
        console.log(`setting title ${db[tabId]}`);
        chrome.scripting.executeScript({
            target: {
                tabId: tab.id,
            },
            func: (storedTitle) => {
                document.title = storedTitle;
            },
            args: [db[tabId]]
        });
        //tab.title = db[tabId]; //doesn't work
    }
    console.log(`original tabId : ${tabId}`);
    console.log(`original tab title : ${db[tabId]}`);
    console.log(`new tabId : ${tab.id}`);
    db[tab.id] = db[tabId]; // use the new tab id (may or may not be same as tabId)
    console.log(`new tab title : ${db[tab.id]}`);
    delete db[tabId];
};

chrome.commands.onCommand.addListener(commandListener);
chrome.runtime.onMessage.addListener(messageListener);
chrome.tabs.onUpdated.addListener(tabUpdatedListener);
