const site = 'https://www.coursicle.com'

chrome.runtime.onInstalled.addListener(()=> {
    chrome.action.setBadgeText({
        text: 'OFF',
    })
});

chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(site)) {
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id })

        const nextState = prevState === 'ON' ? 'OFF' : 'ON'

        chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState,
        })

        if (nextState === 'ON') {
            await chrome.scripting.insertCSS({
                files : ['dark-mode.css'],
                target: { tabId : tab.id},
            })
        } else if (nextState === 'OFF') {
            await chrome.scripting.removeCSS({
                files : ['dark-mode.css'],
                target: { tabId : tab.id },
            })
        }
    }
})