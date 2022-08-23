const fs = require("fs/promises");
const processLine = require("./steps/process-line");
const { LOGS } = require("./constants");

async function main() {
  try {
    const data = await fs.readFile("./code.txt", { encoding: "utf8" });

    const lines = data.split(/\r?\n/);

    const inputs = [];
    const outputs = [];

    lines.forEach(function (line) {
      processLine(line, inputs, outputs);
    });

    if (LOGS) {
      console.log(inputs);
      console.log(outputs);
    }
  } catch (err) {
    console.log(err);
  }
}

main();
