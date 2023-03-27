//https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/part2-content-scripts
//https://betterprogramming.pub/the-ultimate-guide-to-building-a-chrome-extension-4c01834c63ec

const form = document.getElementById("form-main");
const inputName = document.getElementById("input-name");
//callback to send message to content script
const sendMessage = async (tabs) => {
    try {
        await chrome.tabs.sendMessage(tabs[0].id,
            {
                action: "RENAME_TAB",
                props: { name: inputName.value }
            });
        await chrome.runtime.sendMessage("",
            {
                action: "RENAME_TAB_COMPLETE",
                props: { tabId: tabs[0].id, tabTitle: inputName.value }
            }, (response) => { });
    }
    catch (e) {
        //notification api cannot be used in popup,content_script
    };
}
const setInitialInputValue = () => {
    const setTitle = (tabs) => {
        console.log(tabs)
        inputName.value = tabs[0].title || ""
    }
    chrome.tabs.query({ active: true, currentWindow: true }, setTitle);
};

form.onsubmit = (e) => {
    e.preventDefault();
    try {
        chrome.tabs.query({ active: true, currentWindow: true }, sendMessage);
    } catch (e) {
        alert(e);
    }
    window.close();
};

/*
 * https://developer.chrome.com/docs/extensions/reference/commands/
 */
window.addEventListener('DOMContentLoaded', (event) => {
    inputName.focus();
    setInitialInputValue();

});
