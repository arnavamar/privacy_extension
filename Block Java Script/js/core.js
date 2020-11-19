

let isOff = true;

const setContentsJS = flag => {


  chrome.contentSettings.javascript.set({
    primaryPattern: "<all_urls>",
    setting: flag ? "block" : "allow",
    scope: "regular"
  });


  chrome.browserAction.setIcon({
    path: {
      "19": `icons/icon-elte1${flag ? "-off" : ""}.png`,
      "38": `icons/icon-elte2${flag ? "-off" : ""}.png`
    }
  });


  chrome.browserAction.setTitle({
    title: `Block Java Script: ${flag ? "OFF" : "ON"}`
  });
  isOff = !flag;
};

chrome.browserAction.onClicked.addListener(tab => {
  setContentsJS(isOff);
  chrome.tabs.update(tab.id, { url: tab.url });
});


