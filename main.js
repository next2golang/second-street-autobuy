
window.addEventListener('click', notifyExtension);

async function notifyExtension(e) {
  const firstParent = e.target.parentNode;
  const secondParent = firstParent.parentNode;
  const thirdParent = secondParent.parentNode;

  const pattern = /\/goods\/detail\/goodsId\/(\d+)\/shopsId\/(\d+)/;

  if (pattern.test(secondParent.href)) {
    const res = await chrome.runtime.sendMessage({ action: "add_cart", url: secondParent.href });
  } else {
    if (pattern.test(firstParent.href)) {
      const res = await chrome.runtime.sendMessage({ action: "add_cart", url: firstParent.href });
    } else {
      if (pattern.test(thirdParent.href)) {
        const res = await chrome.runtime.sendMessage({ action: "add_cart", url: thirdParent.href });
      }
    }
  }

}
