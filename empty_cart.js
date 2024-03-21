window.onload = function () {
    chrome.runtime.sendMessage({ action: "empty_cart" });
};
