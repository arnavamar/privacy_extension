var bjs_status = document.getElementById('bj');
var bj_img = document.getElementById('bjs');
let isOff = true;

bjs_status.addEventListener("click", function() {
    const setContentsJS = flag => {
        chrome.contentSettings.javascript.set({
            primaryPattern: "<all_urls>",
            setting: flag ? "block" : "allow",
            scope: "regular"
        });
        bj_img.src = `/images/19_BJs${flag ? "-off":""}.png`
        isOff = !flag;
        console.log(flag);
        console.log(`/images/19_BJs${flag ? "-off":""}.png`);
        
    };
    setContentsJS(isOff);
    chrome.tabs.update(tab.id, { url: tab.url });
});