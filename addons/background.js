
// todo browser action click
browser.browserAction.onClicked.addListener(
  async (tab, info) => {

  });

// todo page action click
browser.pageAction.onClicked.addListener(
  async (tab, info) => {

  });

browser.runtime.onMessage.addListener(async (message) => {

  let act = message.act;
  delete message.act;
  switch ( act ) {
  case 'act123':

    break;
  }
});

let menuIdabc = browser.contextMenus.create({
  id: 'menuIdabc',
  title: 'menuIdabc title',
  contexts: [
    'link',

  ],
}, null);

browser.contextMenus.onClicked.addListener(
  async (info, tab) => {
    switch ( info.menuItemId ) {
    case menuIdabc:



      break;
    }

  });