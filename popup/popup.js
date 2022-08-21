//https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/part2-content-scripts
//https://betterprogramming.pub/the-ultimate-guide-to-building-a-chrome-extension-4c01834c63ec

const form = document.getElementById("form-main");
const inputName = document.getElementById("input-name");
//const Http = require('http')


const makeServerRequest2 = () =>{

    const options = {
        url : "127.0.0.1",
        port : 8000,
        path : "/"
    }
    //fetch(`${options.url}:${options.port}`).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.error(err))
    fetch("http://127.0.0.1:8000").then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.error(err))
}
const makeServerRequest = () =>{
    const options = {
        url : "127.0.0.1",
        port : 8000,
        path : "/"
    }
    const resHander = (res)=>{
        res.on('data',data=>{
            console.log(data)
        })
    }
    const req = Http.request(options,resHandler)
    req.on("error",error=>console.error(error))
    req.end()
}

inputName.addEventListener("focus",(e)=>{
    // related : https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserAction/setTitle
    const setTitle = (tabs) => {
        e.target.value = tabs[0].title
    }

    chrome.tabs.query({active:true,currentWindow:true},setTitle);
    makeServerRequest2()
}
)
//callback to send message to content script
const sendMessage = (tabs)=>{
    chrome.tabs.sendMessage(tabs[0].id,
                            {action:"RENAME_TAB",
                            props:{name:inputName.value},
                            tabId:tabs[0].id
                            });
};

form.onsubmit=(e)=>{
    e.preventDefault();
    chrome.tabs.query({active:true,currentWindow:true},sendMessage);
    window.close();
};

/*
 * https://developer.chrome.com/docs/extensions/reference/commands/
 */
window.addEventListener('DOMContentLoaded', (event) => {
    inputName.focus();
});
