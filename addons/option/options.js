
/**
 *
 * @param key_
 * @return {Promise<{[p: string]: any}>}
 */
async function brStorageGet(key_) {
  let obj = await browser.storage.local.get(key_);
  let key = Object.keys(obj)[0]
  let value = Object.values(obj)[0]
  return {key: key, value: value}
}

/**
 *
 * @param keyName{String}
 * @param keyValue{String}
 * @return {Promise<void>}
 */
async function brStorageSet(keyName, keyValue){
  let obj = {}
  obj[keyName] = keyValue
  await browser.storage.local.set(obj)
}

function keyList() {
  return {
    defaultquality: 'defaultquality',
    thumbnaildownload: 'thumbnaildownload',
    openindexhtmlwhenenabled: 'openindexhtmlwhenenabled'
  };
}

function init() {
  document.querySelector('head')
    .insertAdjacentHTML('beforeend',`<style>
        .container-fluid {
            --bs-gutter-x: 1.5rem;
            --bs-gutter-y: 0;
            width: 100%;
            padding-right: calc(var(--bs-gutter-x) * 0.5);
            padding-left: calc(var(--bs-gutter-x) * 0.5);
            margin-right: auto;
            margin-left: auto;
        }

        .my-2 {
            margin-top: 0.5rem !important;
            margin-bottom: 0.5rem !important;
        }
    </style>`)

  document.querySelector('body')
    .insertAdjacentHTML('afterbegin',
      `<div class="container-fluid">
    <div class="my-2">
        default quality: <span>1080p</span>
    </div>
    <div class="my-2">
        <label for="checkThumbnail">
        thumbnail download before video download</label>
        <input type="checkbox" id="checkThumbnail" name="checkThumbnail"/>
    </div>
<!--    <div class="my-2">-->
<!--        <label for="checkIndexhtml">open index html when addons enabled</label>-->
<!--        <input type="checkbox" id="checkIndexhtml" name="checkIndexhtml"/>-->
<!--    </div>-->
    
</div>
`
    )
}

init()

function checkBoxInit() {
  const checkthumbnail = document.querySelector('#checkThumbnail');
  let checkedstring = 'checked';
  brStorageGet(keyList().thumbnaildownload).then((obj) => {
    let value = obj.value;
    if (value) {
      checkthumbnail.checked = checkedstring;
    }
    else {
      checkthumbnail.removeAttribute(checkedstring);
    }
  });
}

checkBoxInit();

function checkBoxEvent() {
  const checkthumbnail = document.querySelector('#checkThumbnail');
  let checkedstring = 'checked';
  checkthumbnail.addEventListener('change', async (event) => {
    let checked = event.target[checkedstring];
    await brStorageSet(keyList().thumbnaildownload, checked);
  });
}

checkBoxEvent();

