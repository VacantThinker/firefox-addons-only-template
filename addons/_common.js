/**
 * await browser.runtime.sendMessage(message)
 * @param message
 * @return {Promise<void>}
 */
async function brRuntMessage(message) {
  await browser.runtime.sendMessage(message);
}

/**
 *
 * @param message{{tabId, func: Function, any: any}}
 * @return {Promise<void>}
 */
async function brScriptingExec(message) {
  let {tabId, func} = message;
  // browser.contentScripts.register() // not working!!!
  await browser.scripting.executeScript({
    target: {tabId},
    args: [message],
    func: func,
  });
}

/**
 * await browser.tabs.sendMessage(tabId, message);
 * @param tabId
 * @param message
 * @return {Promise<void>}
 */
async function brTabMessage(tabId, message) {
  await browser.tabs.sendMessage(tabId, message);
}

/**
 *
 * @param createCreateProperties{_CreateCreateProperties}
 * @return {Promise<browser.tabs.Tab>}
 */
async function brTabCreate(createCreateProperties) {
  return await browser.tabs.create(createCreateProperties);
}

/**
 *
 * @param queryQueryInfo{_QueryQueryInfo}
 * @return {Promise<browser.tabs.Tab[]>}
 */
async function brTabQueryAll(queryQueryInfo) {
  return await browser.tabs.query(queryQueryInfo);
}

/**
 *
 * @param queryQueryInfo{_QueryQueryInfo}
 * @return {Promise<browser.tabs.Tab|null>}
 */
async function brTabQueryFirst(queryQueryInfo) {
  let tabs = await browser.tabs.query(queryQueryInfo);
  return tabs.length >= 1
    ? tabs.shift()
    : null;
}

/**
 * inside function (donot export)
 * @param tabCreateId
 * @param message {Object}
 * @return {Promise<void>}
 * @private
 */
async function _tabSendMessage(tabCreateId, message) {
  let cb = async (tabId, changeInfo, tab) => {
    if (tabId === tabCreateId && tab.status.includes('complete')) {
      message['tabId'] = tabId;
      try {
        setTimeout(async () => {
          await brTabMessage(tabId, message);
        }, 1200);
        browser.tabs.onUpdated.removeListener(cb);
      } catch (e) {
      }
    }
  };
  browser.tabs.onUpdated.addListener(cb);
}

/**
 * send message to tab by tabId
 * @param createProp{_CreateCreateProperties}
 * @param message{Object}
 */
async function sendMessageWithTabNew(createProp, message) {
  let tabCreate = await brTabCreate(createProp);
  await _tabSendMessage(tabCreate.id, message);
}

/**
 * default: 'all'
 *
 * {
 *     all: 'all',
 *     first: 'first',
 *   }
 * @return {{all: string, first: string}}
 */
function tabExistsType() {
  return {
    all: 'all',
    first: 'first',
  };
}

/**
 *
 * @param queryQueryInfo{_QueryQueryInfo}
 * @param message{Object}
 * @param type default: 'all' <= tabExistsType().all
 * @return {Promise<void>}
 */
async function sendMessageWithTabExists(
  queryQueryInfo,
  message,
  type = tabExistsType().all,
) {

  let tabs = [];
  switch (type) {
    case tabExistsType().all:
      tabs.push(...(await brTabQueryAll(queryQueryInfo)));
      break;
    case tabExistsType().first:
      tabs.push(await brTabQueryFirst(queryQueryInfo));
      break;
  }
  for (const tab of tabs) {
    await brTabMessage(tab.id, message);
  }
}

// *******************************
// browser.runtime.onMessage.addListener

function act12Fn(message) {
  // todo do something

}

// *******************************
// browser.contextMenus.onClicked.addListener

function listValue() {
  return {
    image: 'image',
  };
}

function listProp() {
  return {
    mediaType: 'mediaType',
    srcUrl: 'srcUrl',

    linkText: 'linkText',
    linkUrl: 'linkUrl',
  };
}

/**
 *
 * @param info{browser.contextMenus.OnClickData}
 * @return {String}
 */
function getLinkOrSrc(info) {
  // info.linkUrl || info.srcUrl
  let res = null;
  if (info.hasOwnProperty(listProp().mediaType) &&
    info.hasOwnProperty(listProp().srcUrl)) {
    res = info.srcUrl;
  }
  else if (info.hasOwnProperty(listProp().linkText) &&
    info.hasOwnProperty(listProp().linkUrl)
  ) {
    res = info.linkUrl;
  }
  return res;
}

function getURLList() {
  return {
    abc: 'https://abcdefg.com/',
  };
}

function menuIdabcFn(message) {
  // todo do something
}

export {
  brTabMessage,
  brTabCreate,
  brTabQueryAll,
  brTabQueryFirst,

  sendMessageWithTabNew,
  sendMessageWithTabExists,
  tabExistsType,

  // *******************************
  // browser.runtime.onMessage.addListener
  act12Fn,

  // *******************************
  // browser.contextMenus.onClicked.addListener
  getLinkOrSrc,
  menuIdabcFn,

};