const processInputLine = require("./process-input-line");
const processOutputLine = require("./process-output-line");
const processTransitionLine = require("./process-transition-line");

/**
 * @function
 * @param {String} line
 * @param {Array<String>} inputs
 * @param {Array<String>} outputs
 */
function processLine(line, inputs, outputs) {
  let processed;

  processed = processInputLine(line, inputs);

  if (processed) {
    return;
  }

  processed = processOutputLine(line, outputs);

  if (processed) {
    return;
  }

  processed = processTransitionLine(line);
}

module.exports = processLine;
