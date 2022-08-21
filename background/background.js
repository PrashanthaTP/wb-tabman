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

const getStorage =  async(keyList)=>{
    //let value = null;
    let value = {};
    let a = null;
    await chrome.storage.local.get(keyList,(result)=>{
        
        Object.assign(value,result)
        a = result;
        a = result[keyList[0]]
    }) 
    console.log(a);
    console.log("Value retrieved",keyList,Object.values(value) ,value)
    console.table(value)
    return value[keyList[0]];

}
/*
* From 
* https://developer.chrome.com/docs/extensions/reference/tabs/#event-onUpdated
* The callback parameter looks like:
* (tabId: number, changeInfo: object, tab: Tab) => void
*/
const tabUpdateListener = async (tabId,changeInfo,tab)=>{
    const prevName = await getStorage([`${tabId}`])
    console.log("tabUpdateListener",prevName)
    if(prevName==null){
        return
    }
    console.log(tab.title)
    console.log(chrome.tabs.get(tabId).title);

}
chrome.commands.onCommand.addListener(commandListener)

chrome.tabs.onUpdated.addListener(tabUpdateListener)
