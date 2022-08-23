class Transition {
  /**
   * @function
   * @param {Number} initialState
   * @param {Number} finalState
   * @param {Array<String>} inputs
   * @param {Array<String>} outputs
   */
  constructor(initialState, finalState, inputs, outputs) {
    this.initialState = initialState;
    this.finalState = finalState;
    this.inputs = inputs;
    this.outputs = outputs;
  }
}

module.exports = Transition;
