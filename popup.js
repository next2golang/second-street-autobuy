document.addEventListener('DOMContentLoaded', async function () {
  let button = document.getElementById('toggle-extension');

  
  const response = await chrome.runtime.sendMessage({ action: "getTabStatus" });
  button.textContent = response.status ? 'カートに入れる' : '直接購入';
  const color = response.status ? '#26b81c' : '#D97A7A';
  button.style.backgroundColor = color;

  button.addEventListener('click', async function () {
    // let newStatus = button.textContent === '自動購入をON';
    const res = await chrome.runtime.sendMessage({ action: "toggleTab" });
    const color = res.status ? '#26b81c' : '#D97A7A';
    button.textContent = res.status ? 'カートに入れる' : '直接購入';
    button.style.backgroundColor = color;
  });

});
