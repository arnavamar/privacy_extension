'use strict';

var check = chrome.runtime.getURL("html/unsafe.html");
window.open(check,'_self');
