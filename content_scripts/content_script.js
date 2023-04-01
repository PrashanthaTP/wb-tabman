const debug = (msg) => {
    console.log(`TabMan: ${msg}`);
};

const ACTIONS = {
    RENAME_TAB: "RENAME_TAB",
    RENAME_TAB_COMPLETE: "RENAME_TAB_COMPLETE",
    TEST_BG_LISTENER: "TEST_BG_LISTENER",
    SHOW_NOTIFICATION: "SHOW_NOTIFICATION",
};

const messageListener = (message, sender, sendResponse) => {
    const { action, props } = message;
    debug("Inside content script message listener");
    switch (action) {
        case ACTIONS.RENAME_TAB:
            document.title = props.name;
            sendResponse({ title: document.title });
            return true;
            break;
        default:
            break;
    }
};

debug("Content Script: Listener attached");
chrome.runtime.onMessage.addListener(messageListener);
