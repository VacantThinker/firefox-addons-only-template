import {storageMap} from './storageMap';

/**
 *
 * @type {{
 *              defaultquality: string,
 *
 *              usedownloadlink: string,
 *
 *              thumbnaildownload: string,
 *              jumpToTheVideoADF: string,
 *              openToTheVideoADF: string,
 *
 *              notiVideoSearch: string,
 *              notiStartDowning: string,
 *              notiDownloadOk: string,
 *
 *              cmDownVideo: string,
 *              cmDownThumb: string,
 *              cmSFTUploadio: string,
 *
 *              addextrar: string,
 *
 *              }}
 */
export const stoKeyList =
  getstoKeyList();

function getstoKeyList() {
  let obj = {};
  Object.values(storageMap).forEach(
    /**
     *
     * @param value{{
     *          type:string,
     *          title:string,
     *          map?:{},
     *          arr?:[],
     *          key?:string,
     *          defaultvalue?:string,
     *
     * }}
     */
    (value) => {
      let type = value.type;
      if (String(type).includes('check')) {
        let map = value.map;
        Object.values(map).forEach(
          /**
           *
           * @param item{ {
           *          name:string,
           *          val: string,
           *          defaultvalue: string
           *
           *          }}
           */
          (item) => {
            let k = item.name;
            let defaultvalue = item.defaultvalue;
            obj[k] = k;
          });
      }
      else {
        let k = value.key;
        let defaultvalue = value.defaultvalue;
        obj[k] = k;
      }

    });

  return obj;
}