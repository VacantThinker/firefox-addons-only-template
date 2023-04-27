// copy it to use
//*****************************************************

/**
 * save text to file use element a download and href
 * @param text txt of the file
 * @param filename file name
 */
function saveTextToFile(text, filename) {
  let eleA = document.createElement('a');
  eleA.href = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
  eleA.download = `${filename}`;
  eleA.click();
}
