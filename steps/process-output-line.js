/**
 * @function
 * @param {String} line
 * @param {Array<String>} outputs
 *
 * @returns {Boolean}
 */
function processOutputLine(line, outputs) {
  const result = line.match(/^output/i);

  if (result == null) {
    return false;
  }

  const output = line.match(/ [a-z]* ?/i)[0].replace(/ /g, "");

  outputs.push(output);

  return true;
}

module.exports = processOutputLine;
