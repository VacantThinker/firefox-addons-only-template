import {$brStorageGet} from '../br/br_storage_op';
// import {mapStoKeyToContextMenuId} from './svupdateContextMenu';
import {stoKeyListContextMenu} from '../../storageKey/storageContextmenu';

/**
 *
 * @param k
 * @return {string}
 */
export function convertStokeyToContextMenuId(k) {
  return String(k).concat('contextmenu');
}

const createListContextMenu = {
  cmDownVideo: () => {
    // context menu => Download Video
    browser.menus.create({
      id: convertStokeyToContextMenuId(stoKeyListContextMenu.cmDownVideo),
      title: 'Download Video',
      contexts: ['link', 'tab', 'selection'],
      onclick: async (info, tab) => {
        // await handleCmDownloadVideo({info, tab});
      },
    }, null);
  },
  cmDownThumb: () => {
    // context menu => Download Thumbnail
    browser.menus.create({
      id: convertStokeyToContextMenuId(stoKeyListContextMenu.cmDownThumb),
      title: 'Download Thumbnail',
      contexts: ['link', 'tab', 'selection'],
      onclick: async (info, tab) => {
        // await handleCmDownloadThumbnail({info, tab});
      },
    }, null);
  },
};

/**
 * if true, create context menu.
 * @param arr{ string[]}
 * @return {Promise<void>}
 */
async function checkstoKeyContextMenu(arr) {
  for (const key of arr) {
    let {value} = await $brStorageGet(key);
    let id = convertStokeyToContextMenuId(stoKeyListContextMenu[key]);
    await browser.menus.update(id, {visible: value});
  }
}

export async function svSetContextMenu() {
  Object.values(createListContextMenu)
    .forEach((value) => value());

  await checkstoKeyContextMenu(
    Object.keys(createListContextMenu),
  );
}
