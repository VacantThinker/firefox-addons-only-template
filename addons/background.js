console.log('background.js working', new Date());

browser.browserAction.onClicked.addListener(
  async (tab, info) => {

  });

browser.pageAction.onClicked.addListener(
  async (tab, info) => {

});

browser.runtime.onMessage.addListener(async (message) => {
  let action = message.action;
  switch (action) {
    case 'xxxxFn':
      // xxxxFn()
      break;
  }
});

let menuIdabc = browser.contextMenus.create({
  id: 'menuIdabc', title: 'menuIdabc title',
  contexts: ['link', 'video', 'page', 'selection'],
}, null);

browser.contextMenus.onClicked.addListener(async (info) => {
  switch (info.menuItemId) {
    case menuIdabc:
      // await menuIdabcFn(message);
      break;

  }

});