import {act12Fn, menuIdabcFn, sendMessageWithTabNew} from './_common.js';

console.log('background.js working', new Date());

browser.browserAction.onClicked.addListener(
  async (tab, info) => {

    await sendMessageWithTabNew({
      url: 'https://www.bing.com/',
    }, {data: 'hello'});

  });

browser.pageAction.onClicked.addListener(
  async (tab, info) => {

  });

browser.runtime.onMessage.addListener(async (message) => {
  console.log(`meslog browser.runtime.onMessage message=\n`, message);
  let action = message.action;
  switch (action) {
    case 'act12':
      await act12Fn(message);
      break;
  }
});

let menuIdabc = browser.contextMenus.create({
  id: 'menuIdabc', title: 'menuIdabc title',
  contexts: ['link', 'video', 'page', 'selection'],
}, null);

browser.contextMenus.onClicked.addListener(
  async (info, tab) => {
    switch (info.menuItemId) {
      case menuIdabc:
        await menuIdabcFn({info, tab});
        break;

    }

  });