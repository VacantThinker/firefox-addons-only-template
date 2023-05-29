import {storageMap} from './storageMap';

/**
 *
 * @return {{}}
 */
export function stoDefaultObj() {
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
            obj[k] = defaultvalue;
          });
      }
      else {
        let key = value.key;
        let defaultvalue = value.defaultvalue;
        obj[key] = defaultvalue;
      }

    });

  return obj;
}