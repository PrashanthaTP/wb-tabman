import { ACTIONS,debug } from "../utils/index.js";

debug("Background script started");
const tabStatus_t = {
    unloaded: "unloaded",
    loading: "loading",
    complete: "complete",
};

let db = {};
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
    debug("Inside runtime message listener");
    const { action, props } = request;
    switch (action) {
        case ACTIONS.TEST_BG_LISTENER:
            debug("Inside Test case");
            break;
        case ACTIONS.RENAME_TAB_COMPLETE:
            const { tabId, tabTitle } = props;
            debug(`db updated : ${tabTitle}`);
            db[tabId] = tabTitle;
            return true; //return true important
            break;
        case ACTIONS.SHOW_NOTIFICATION:
            console.log(props);
            chrome.notifications.create("", props);
            return true; //return true important
            break;
        default:
            break;
    }
};

const tabUpdatedListener = (tabId, changeInfo, tab) => {
    // Check if the tab title is in 'db'
    // if so reuse the title
    if (changeInfo.status !== tabStatus_t.complete) {
        return;
    }
    if (!(tabId in db)) {
        return;
    }
    chrome.scripting.executeScript({
        target: {
            tabId: tab.id,
        },
        func: (storedTitle) => {
            document.title = storedTitle;
        },
        args: [db[tabId]],
    });
    //tab.title = db[tabId]; //doesn't work
    db[tab.id] = db[tabId]; // use the new tab id (may or may not be same as tabId)
    delete db[tabId];
};

chrome.commands.onCommand.addListener(commandListener);
chrome.runtime.onMessage.addListener(messageListener);
chrome.tabs.onUpdated.addListener(tabUpdatedListener);
