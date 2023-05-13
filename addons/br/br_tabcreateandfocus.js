import {handlePrintConsole} from '../router/actConsole';
import {$brUpdateFocus} from './br_tabupdatefocus';

/**
 * return tabId
 * @param url{string}
 * @param active{boolean}
 * @param focused
 * @return {Promise<number>}
 */
export async function $brTabCreateAndFocus(
  url,
  // active = false,
  active = true,
  focused = true,
) {

  /**
   *
   * @type {browser.tabs.Tab}
   */
  let tab = await browser.tabs.create({url, active});
  let tabId = tab.id;
  if (focused) {
    await $brUpdateFocus(tabId);
  }

  handlePrintConsole({
    from: 'tab create',
    url, tabId,
    tab,
  });

  return tabId;
}