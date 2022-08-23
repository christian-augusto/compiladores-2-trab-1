const Transition = require("./transition");

/**
 * @function
 * @param {String} line
 *
 * @returns {Boolean}
 */
function processTransitionLine(line) {
  const result = line.match(/^[0-9]* [0-9]*/);

  if (result == null) {
    return false;
  }

  const steps = result[0].split(" ");

  const initialState = Number(steps[0]);
  const finalState = Number(steps[1]);

  const [inputsStr, outputsStr] = line
    .replace(/[\d]/gim, "")
    .split("|")
    .map((str) => str.trim());

  const inputs = inputsStr.split(" ");
  const outputs = outputsStr.split(" ");

  const transition = new Transition(initialState, finalState, inputs, outputs);

  console.log(transition);

  return true;
}

module.exports = processTransitionLine;
