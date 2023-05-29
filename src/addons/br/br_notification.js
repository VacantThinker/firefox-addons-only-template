/**
 *
 * @param message{ {
 *            title:String,
 *            text:String,
 *            timeout?:number
 *            }}
 * @returns {Promise<void>}
 */
export async function $brNotification(message) {
  let {title, text} = message;
  let titleDefault = 'youtube playlist download queue', textDefault = '';
  title = title ? title : titleDefault;
  text = text ? text : textDefault;

  let notificationId = 'cake-notification';
  let type = 'basic';

  let timeout = 3;
  timeout = message.hasOwnProperty('timeout')
    ? parseInt(String(message.timeout))
    : timeout;

  await browser.notifications.create(notificationId, {
    type,
    title,
    message: text,
    eventTime: timeout * 1000,
  });
}
