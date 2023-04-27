
/**
 * await browser.tabs.sendMessage(tab.id, message);
 * @param tab
 * @param message
 * @return {Promise<void>}
 */
async function sendMessageToTab(tab, message) {
  await browser.tabs.sendMessage(tab.id, message);
}

export {
  sendMessageToTab,
};