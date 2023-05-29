export const storageMap = {
  qualityoption: {
    type: 'radio',
    title: 'video quality to download:',
    name: 'quality',
    key: 'defaultquality',
    defaultvalue: '1080p',
    arr: [
      '2160p',
      '1440p',
      '1080p',
      '720p',
    ],
  },
  getvideodownloadlink: {
    type: 'radio',
    title: 'how to use video download link?',
    name: 'uselink',
    key: 'usedownloadlink',
    defaultvalue: 'save video to up-load.io',
    arr: [
      'browser download',
      'do nothing',
      'save video to up-load.io',
    ],
  },

  uploadiooption: {
    type: 'check',
    title: 'up-load.io save video ok:',
    map: {
      addextrar: {
        name: 'addextrar',
        labelvalue: 'add ext .rar',
        defaultvalue: true,
      },
    },
  },

  videodownloadok: {
    type: 'check',
    title: 'Video Download OK:',
    map: {
      thumbnaildownload: {
        name: 'thumbnaildownload',
        labelvalue: 'Download Thumbnail',
        defaultvalue: false,
      },
      jumpToTheVideoADF: {
        name: 'jumpToTheVideoADF',
        labelvalue: 'Show Video Data',
        defaultvalue: false,
      },
      openToTheVideoADF: {
        name: 'openToTheVideoADF',
        labelvalue: 'Open Video Dir',
        defaultvalue: false,
      },
    },
  },
  notification: {
    type: 'check',
    title: 'Notification:',
    map: {
      notiVideoSearch: {
        name: 'notiVideoSearch',
        labelvalue: 'Video Searching',
        defaultvalue: true,
      },
      notiStartDowning: {
        name: 'notiStartDowning',
        labelvalue: 'Start Downloading',
        defaultvalue: false,
      },
      notiDownloadOk: {
        name: 'notiDownloadOk',
        labelvalue: 'Download OK',
        defaultvalue: true,
      },
    },
  },
  contextmenu: {
    type: 'check',
    title: 'Context Menu:',
    map: {
      cmDownVideo: {
        name: 'cmDownVideo',
        labelvalue: 'Download Video',
        defaultvalue: true,
      },
      cmDownThumb: {
        name: 'cmDownThumb',
        labelvalue: 'Download Thumbnail',
        defaultvalue: false,
      },
    },
  },

};


// ============================================================================

function getStorageKeyRadio() {
  let reduce = Object.values(storageMap)
    .filter((value) => {
      return value.type.includes('radio');
    })
    .reduce((res, value) => {
      let {key, name} = value;

      res[key] = {
        key: key,
        name: name,
      };
      return res;
    }, {});

  return reduce;
}

function getArrUseDownloadlink() {
  return storageMap.getvideodownloadlink.arr;
}

export const storageKeyRadio = getStorageKeyRadio();
/**
 *       'browser download',
 *
 *       'do nothing',
 *
 *       'save video to up-load.io',
 *
 * @type {string[]}
 */
export const storageArrUseDownloadlink = getArrUseDownloadlink();