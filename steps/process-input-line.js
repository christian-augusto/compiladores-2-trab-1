/**
 * @function
 * @param {String} line
 * @param {Array<String>} inputs
 *
 * @returns {Boolean}
 */
function processInputLine(line, inputs) {
  const result = line.match(/^input/i);

  if (result == null) {
    return false;
  }

  const input = line.match(/ [a-z]* ?/i)[0].replace(/ /g, "");

  inputs.push(input);

  return true;
}

module.exports = processInputLine;
