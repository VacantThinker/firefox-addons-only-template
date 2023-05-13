/**
 *
 * @param message{ {
 *          from: string,
 *          any: any,
 *
 * }}
 */
export function handlePrintConsole(message) {

  // let canLog = false;
  let canLog = true;

  if (canLog) {
    if (message.hasOwnProperty('json')) {
      let value = message['json'];
      let parse = JSON.parse(value);
      console.log(`meslog actConsole json=\n`, parse);
    }
    else {
      console.log(`meslog actConsole message=\n`, message);
    }
  }
}
