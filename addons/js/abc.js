

console.log('abc.js')

async function sendMessageToBackground(message) {
  await browser.runtime.sendMessage({
    action: 'act12',
    ...message
  })
}

browser.runtime.onMessage.addListener(async (message) => {

  console.log(`meslog abc.js message=\n`, message);

  // message
  // your code is here
  await sendMessageToBackground({xx: 'ascdefg'})

})