window.onload = async function () {
    const response = await chrome.runtime.sendMessage({ action: "getTabStatus" });
    const finalCheckButton = document.getElementById('order_submit');
    console.log("response.state", response, finalCheckButton);
    if (response.status === false) {
        console.log("response.state === false", response);
        // if (finalCheckButton) {
        //     finalCheckButton.click();
        // }
    }
};
