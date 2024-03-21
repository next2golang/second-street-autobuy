window.onload = function () {
    console.log('I am here empty cart javascript');
    const res = chrome.runtime.sendMessage({ action: "empty_cart" });
};
