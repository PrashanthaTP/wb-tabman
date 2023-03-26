let db = {}
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

const messageListner = (request,sender,sendMessage) =>{
    const {action,props} = request;
    switch(action){
        case "RENAME_TAB_COMPLETE" : 
            const {tabId,tabTitle} = props;
            db[tabId] = tabTitle;  
            break;
        case "SHOW_NOTIFICATION":
            console.log(props)
            console.log()
            chrome.notifications.create('',props);
            break;
        default:
            break;
    }
}
chrome.commands.onCommand.addListener(commandListener)
chrome.runtime.onMessage.addListener(messageListner)

        chrome.runtime.sendMessage({
            action: "SHOW_NOTIFICATION",
            props: { title: "test",
                message: "test!",
                iconUrl : chrome.runtime.getURL("/images/notification_icon.png"),
                type: 'basic' }
        });

function show() {
  var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
  var hour = time[1] % 12 || 12;               // The prettyprinted hour.
  var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
  new Notification(hour + time[2] + ' ' + period, {
    icon: '48.png',
    body: 'Time to make the toast.'
  });
}
show()
