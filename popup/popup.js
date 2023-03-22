//https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/part2-content-scripts
//https://betterprogramming.pub/the-ultimate-guide-to-building-a-chrome-extension-4c01834c63ec

const form = document.getElementById("form-main");
const inputName = document.getElementById("input-name");
//callback to send message to content script
const sendMessage = (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id,
        {
            action: "RENAME_TAB",
            props: { name: inputName.value }
        });
};
const setInitialInputValue = async () => {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id,
        {
            action: "GET_TAB_TITLE",
            props: {}
        });
    inputName.value = response.title;
};

form.onsubmit = (e) => {
    e.preventDefault();
    chrome.tabs.query({ active: true, currentWindow: true }, sendMessage);
    window.close();
};

/*
 * https://developer.chrome.com/docs/extensions/reference/commands/
 */
window.addEventListener('DOMContentLoaded', (event) => {
    inputName.focus();
    setInitialInputValue();
});
