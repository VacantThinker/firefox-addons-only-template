
// todo browser action click
import {svSetContextMenu} from './service/svSetContextMenu';

browser.browserAction.onClicked.addListener(
  async (tab, info) => {

  });

// todo page action click
browser.pageAction.onClicked.addListener(
  async (tab, info) => {

  });

browser.runtime.onMessage.addListener(async (message) => {

  let keyAct = 'act';
  let act = message[keyAct];
  delete message[keyAct];

  switch ( act ) {
  case 'act123':

    break;
  }
});

// todo initial context menu
await svSetContextMenu();