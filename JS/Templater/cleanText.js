async function cleanText (tp, text) {
  console.log('detalle', text);
  const excludedChars = /[*"\\/<>:|]/g
  const cleannedText = text.replace(excludedChars, '')

  return {text: cleannedText}
}
module.exports = cleanText
