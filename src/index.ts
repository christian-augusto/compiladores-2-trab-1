import fs from "fs/promises";
import processLine from "./steps/process-line";
import * as config from "./config";
import Transition from "./steps/transition";

async function main() {
  try {
    config.initConfig();

    const data = await fs.readFile("./code.txt", { encoding: "utf8" });

    const lines = data.split(/\r?\n/);

    const inputs: Array<string> = [];
    const outputs: Array<string> = [];
    const transitions: Array<Transition> = [];

    lines.forEach(function (line: string) {
      const transition = processLine(line, inputs, outputs);

      if (transition == null) {
        return;
      }

      transitions.push(transition);
    });

    let outputCode = "";

    outputCode += generateInputsDeclaration(inputs);
    outputCode += generateOutputsDeclaration(outputs);
    outputCode += graphCodeLine();

    transitions.forEach(function (transition) {});

    outputCode += endCodeLine();

    if (config.GetLogs()) {
      console.log(inputs);
      console.log(outputs);
      console.log(transitions);
      console.log(outputCode);
    }
  } catch (err) {
    console.log(err);
  }
}

function generateInputsDeclaration(inputs: Array<string>): string {
  return `.inputs ${inputs.join(", ")}` + "\n";
}

function generateOutputsDeclaration(outputs: Array<string>): string {
  return `.outputs ${outputs.join(", ")}` + "\n";
}

function graphCodeLine(): string {
  return ".graph\n";
}

function endCodeLine(): string {
  return ".end\n";
}

main();
