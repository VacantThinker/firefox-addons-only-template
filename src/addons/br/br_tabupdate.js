const $brUpdate = async (tabId, updateProperties) =>
  await browser.tabs.update(tabId, updateProperties);

/**
 *
 * @param tabId{ number}
 * @return {Promise<void>}
 */
export async function $brUpdateActiveFocus(tabId) {
  let {windowId} = await browser.tabs.get(tabId);

  let updateProperties = {
    active: true,
  };
  await $brUpdate(
    tabId,
    updateProperties,
  );
  await browser.windows.update(
    windowId,
    {focused: true},
  );
}

export async function $brUpdateUrl(tabId, {url}) {
  await $brUpdate(tabId, {url});
}