// copy it to use
//*****************************************************

/**
 * save text to file use element cwd download and href
 * @param text txt of the file
 * @param filename file name
 */
function saveTextToFile(text, filename) {
  let eleA = document.createElement('a');
  eleA.href = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
  eleA.download = `${filename}`;
  eleA.click();
}

/**
 *
 *     activeTab
 *     alarms
 *     background
 *     bookmarks
 *     browserSettings
 *     browsingData
 *     captivePortal
 *     clipboardRead
 *     clipboardWrite
 *     contentSettings
 *     contextMenus
 *     contextualIdentities
 *     cookies
 *     debugger
 *     declarativeNetRequest
 *     declarativeNetRequestFeedback
 *     declarativeNetRequestWithHostAccess
 *     dns
 *     downloads
 *     downloads.open
 *     find
 *     geolocation
 *     history
 *     identity
 *     idle
 *     management
 *     menus
 *     menus.overrideContext
 *     nativeMessaging
 *     notifications
 *     pageCapture
 *     pkcs11
 *     privacy
 *     proxy
 *     scripting
 *     search
 *     sessions
 *     storage
 *     tabHide
 *     tabs
 *     theme
 *     topSites
 *     unlimitedStorage
 *     webNavigation
 *     webRequest
 *     webRequestBlocking
 *     webRequestFilterResponse
 *     webRequestFilterResponse.serviceWorkerScript
 */