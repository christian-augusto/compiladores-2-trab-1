const processInputLine = require("./process-input-line");
const processOutputLine = require("./process-output-line");
const processTransitionLine = require("./process-transition-line");
const Transition = require("./transition");

/**
 * @function
 * @param {String} line
 * @param {Array<String>} inputs
 * @param {Array<String>} outputs
 * @returns {Transition}
 */
function processLine(line, inputs, outputs) {
  let processed;

  processed = processInputLine(line, inputs);

  if (processed) {
    return null;
  }

  processed = processOutputLine(line, outputs);

  if (processed) {
    return null;
  }

  return processTransitionLine(line);
}

module.exports = processLine;
