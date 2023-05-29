/**
 * moz-extension://70ddf837-939e-4aad-902c-a6d6c4cb4fa0/index.html#search-view
 * @return {string}
 * @private
 */
import {$brTabRemove} from './br_tabremove';
import {$brTabCreateAndFocus} from './br_tabcreateandfocus';
import {$brUpdateFocus} from './br_tabupdate';

/**
 *
 * @return {string}
 * @private
 */
function _urlIndexhtml() {
  return browser.runtime.getManifest().background.page
    .replace('background.html', 'index.html');
}

/**
 * tabId
 * @returns {Promise<null|number>}
 * @private
 */
async function _tabCheckIndexHtml() {
  let url = _urlIndexhtml();
  let tabs = await browser.tabs.query({url: `${url}*`});
  if (tabs.length === 0) {
    return null;
  }
  else {
    let tab = tabs[0];
    let tabId = tab.id;
    await $brUpdateFocus(tabId);
    return tabId;
  }
}

/**
 *
 * @param message
 * @return {Promise<void>}
 */
export async function sendMessageToVue(message) {
  let tabId = await _tabCheckIndexHtml();
  if (tabId) {
    await browser.tabs.sendMessage(tabId, {
      messageVue: true,
      ...message,
    });
  }
}

export async function $brCloseIndexhtml() {
  let url = _urlIndexhtml();
  let tabs = await browser.tabs.query({url: `${url}*`});
  await $brTabRemove(tabs.map(value => value.id));
  return url;
}

export async function openIndexHtml() {
  let url = await $brCloseIndexhtml();
  await new Promise(res => setTimeout(res, 12));
  await $brTabCreateAndFocus(url);
}