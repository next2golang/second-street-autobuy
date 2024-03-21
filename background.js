
let tabStatus = {};
let currentTabId;
let itemId ;
let categoryId ;

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  if (request.action === "getTabStatus") {
    let status = tabStatus.hasOwnProperty(currentTabId) ? tabStatus[currentTabId] : true;
    sendResponse({ status: status });
  }

  if (request.action === "toggleTab") {
    if (tabStatus.hasOwnProperty(currentTabId)) {
      tabStatus[currentTabId] = !tabStatus[currentTabId];
    } else {
      tabStatus[currentTabId] = true;
    }
    
    updateIcon(currentTabId, tabStatus[currentTabId]);
    sendResponse({ status: tabStatus[currentTabId] });
  }

  if (request.action === "add_cart") {
    const urlPattern = /\/goods\/detail\/goodsId\/(\d+)\/shopsId\/(\d+)/;
    const matches = request.url.match(urlPattern);
    itemId = matches[1];
    categoryId = matches[2];
    let formData = new FormData();
    formData.append('goodsId', itemId);
    formData.append('shopsId', categoryId);
    formData.append('num', 1);

    await fetch('https://www.2ndstreet.jp/cart/updateAjax', {
      method: 'POST',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      credentials: 'include'
    })
      .then((data) => {
        console.log('カートに追加されました:', data);
      })
      .catch(error => {
        console.error('カート追加エラー:', error);
      });
      chrome.tabs.update(currentTabId, { url: 'https://www.2ndstreet.jp/delivery' });
  }

  if (request.action === "empty_cart") {
    let formData = new FormData();
    formData.append('goodsId', itemId);
    formData.append('shopsId', categoryId);
    formData.append('num', 1);

    await fetch('https://www.2ndstreet.jp/cart/updateAjax', {
      method: 'POST',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      credentials: 'include'
    })
      .then((data) => {
        console.log('カートに追加されました:', data);
      })
      .catch(error => {
        console.error('カート追加エラー:', error);
      });
      chrome.tabs.update(currentTabId, { url: 'https://www.2ndstreet.jp/delivery' });
  }

  return true;
});

chrome.tabs.onCreated.addListener(async function (tab) {
  currentStatus = tabStatus.hasOwnProperty(tab.id) ? tabStatus[tab.id] : true;
  tabStatus[tab.id] = currentStatus;
});

chrome.tabs.onUpdated.addListener(function () {
   currentStatus = tabStatus.hasOwnProperty(currentTabId) ? tabStatus[currentTabId] : true;
  updateIcon(currentTabId, currentStatus);
})

chrome.tabs.onActivated.addListener(function (activeInfo) {
  currentStatus = tabStatus.hasOwnProperty(activeInfo.tabId) ? tabStatus[activeInfo.tabId] : true;
  currentTabId = activeInfo.tabId;
});

chrome.tabs.onRemoved.addListener(function (tabId) {
  delete tabStatus[tabId];
});

function updateIcon(tabId, isEnabled) {
  const iconPath = isEnabled ? 'icon48.png' : 'red-icon48.png';
  chrome.action.setIcon({
    path: iconPath,
    tabId: tabId
  });
}
