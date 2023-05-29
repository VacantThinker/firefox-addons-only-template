
async function dbInitFnController() {
}

export async function $brInit() {
}

//*********************************************

function blockRequestImage() {

  const cancelType = {
    image: 'image',
  };

  // const cancelArr = [
  //   {
  //     urls: [
  //       urlblock.down4k,
  //       urlblock.svtb],
  //     types: [cancelType.image],
  //   },
  //   {
  //     urls: [urlblock.ytimg],
  //     origins: [
  //       urlList.$dow4k,
  //       urlList.$sbtv],
  //   },
  //   {
  //     urls: [
  //       urlblock.indexeslaughter,
  //       urlblock.disqusjs,
  //       urlblock.yandexjs],
  //     origins: [urlList.$dow4k, urlList.$sbtv],
  //   },
  // ];

  // handleCancelArr(cancelArr);
}

/**
 *
 * @param cancelArr{ [
 *   {urls, types, origins?: [string]}
 * ]}
 */
function handleCancelArr(cancelArr) {
  cancelArr.forEach((value) => {
    if (value.hasOwnProperty('origins')) {
      let origins = value.origins;
      delete value.origins;
      browser.webRequest.onBeforeRequest.addListener(
        (details) => {
          let originUrl = details.originUrl;
          if (origins.find(v => originUrl.includes(v))) {
            return {cancel: true};
          }
        }, value, ['blocking']);
    }
    else {
      browser.webRequest.onBeforeRequest.addListener(
        () => {
          return {cancel: true};
        }, value, ['blocking']);
    }
  });
}