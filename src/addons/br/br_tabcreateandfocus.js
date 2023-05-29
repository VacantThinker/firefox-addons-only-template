import {handlePrintConsole} from '../router/router.console/actConsole';
import {$brUpdateActiveFocus} from './br_tabupdate';

/**
 * return tabId
 * @param url{string}
 * @param active{boolean}
 * @param focused{boolean}
 * @return {Promise<number>}
 */
export async function $brTabCreateAndFocus(
  url,
  // active = false,
  // focused = false,
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
    await $brUpdateActiveFocus(tabId);
  }

  handlePrintConsole({
    from: 'tab create',
    url, tabId,
    tab,
  });

  return tabId;
}