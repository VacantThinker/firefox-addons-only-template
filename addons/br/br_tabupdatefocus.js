/**
 *
 * @param tabId{ number}
 * @param active{ boolean}
 * @param focused{ boolean}
 * @return {Promise<void>}
 */
export async function $brUpdateFocus(
  tabId,
  active = true,
  focused = true,
) {
  let {windowId} = await browser.tabs.get(tabId);

  await browser.tabs.update(
    tabId,
    {
      active,
    },
  );
  await browser.windows.update(
    windowId,
    {
      focused,
    },
  );
}
