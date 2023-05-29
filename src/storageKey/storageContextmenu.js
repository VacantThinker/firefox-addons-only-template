import {storageMap} from './storageMap';

/**
 *
 * @type {{cmDownVideo: string, cmDownThumb: string, cmSFTUploadio: string}}
 */
export const stoKeyListContextMenu =
  getstoKeyListContextMenu();

/**
 *
 * @type {{
 *          cmDownVideo: string,
 *          cmDownThumb: string,
 *          cmSFTUploadio: string,
 *
 *          }}
 */
function getstoKeyListContextMenu() {
  let obj = {};
  let map = storageMap.contextmenu.map;
  Object.keys(map)
    .forEach((k) => obj[k] = k);
  return obj;
}
