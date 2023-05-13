browser.runtime.onMessage.addListener(
  async (message) => {
    if (message) {
      const $brs = async (msg) => await browser.runtime.sendMessage(msg);

      await $brs({

        act: ''
      })
    }

  });