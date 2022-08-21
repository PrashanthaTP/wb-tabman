//https://stackoverflow.com/questions/3937000/chrome-extension-accessing-localstorage-in-content-script
const getStorage = (keyList)=>{
    //let value = null;
    let value = {}
    chrome.storage.local.get(keyList,(result)=>{
        //value=result[keyList[0]];
        Object.assign(value,result);

    })
    console.log("Value retrieved",keyList,value )
    return value[keyList[0]];
}

const setStorage = (keyValue)=>{
    chrome.storage.local.set(keyValue,()=>{
        console.table("Stored",keyValue)
    })
}

let saved_name = new Map()


const messageListener = (message)=>{
    //https://stackoverflow.com/questions/6202953/obtaining-this-tab-id-from-content-script-in-chrome-extension
    const {action,props,tabId} = message;
    //let alreadyRenamedTabIds = getStorage(["renamedTabIds"]) || new Set();
            //console.log("inside message listner : ",saved_name.get(`${tabId}`))
    let prevName = getStorage([`${tabId}`]);
    switch(message.action){
        case "RENAME_TAB":
            /*if(alreadyRenamedTabIds!=null && alreadyRenamedTabIds.has(tabId)){
                break;
            }*/
            console.log("inside message listner : ",saved_name.get(`${tabId}`))
            saved_name.set(`${tabId}`,props.name)
            if (prevName!=null){return}
            document.title=props.name;
            toSave = {} 
            key = `${tabId}`
            toSave[key] = props.name
            setStorage(toSave)
            break;
        default:
            break

    }
}


chrome.runtime.onMessage.addListener(messageListener);
