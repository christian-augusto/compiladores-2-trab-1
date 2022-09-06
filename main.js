const fs = require("fs/promises");
const processLine = require("./steps/process-line");
const { LOGS } = require("./constants");

async function main() {
  try {
    const data = await fs.readFile("./code.txt", { encoding: "utf8" });

    const lines = data.split(/\r?\n/);

    const inputs = [];
    const outputs = [];
    const transitions = [];

    lines.forEach(function (line) {
      const transition = processLine(line, inputs, outputs);

      if (transition) {
        transitions.push(transition);
      }
    });

    let outputCode = "";

    outputCode += generateInputsDeclaration(inputs);
    outputCode += generateOutputsDeclaration(outputs);
    outputCode += graphCodeLine();

    transitions.forEach(function (transition) {});

    outputCode += endCodeLine();

    if (LOGS) {
      console.log(inputs);
      console.log(outputs);
      console.log(transitions);
      console.log(outputCode);
    }
  } catch (err) {
    console.log(err);
  }
}

/**
 * @function
 * @param {Array<String>} inputs
 * @returns {String}
 */
function generateInputsDeclaration(inputs) {
  return `.inputs ${inputs.join(", ")}` + "\n";
}

/**
 * @function
 * @param {Array<String>} outputs
 * @returns {String}
 */
function generateOutputsDeclaration(outputs) {
  return `.outputs ${outputs.join(", ")}` + "\n";
}

/**
 * @returns {String}
 */
function graphCodeLine() {
  return ".graph\n";
}

/**
 * @returns {String}
 */
function endCodeLine() {
  return ".end\n";
}

main();
