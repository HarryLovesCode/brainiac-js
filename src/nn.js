const matrix = require("./matrix");

class LayeredNeuralNetwork {
  constructor(layers) {
    this.layers = layers;
  }

  train(inputArr, targetArr) {
    let inputs = matrix.fromArray(inputArr);
    let targets = matrix.fromArray(targetArr);

    // Foward propagation.
    let outputs = inputs;

    for (let i = 0; i < this.layers.length; i++) {
      outputs = this.layers[i].forward(outputs);
    }

    // Back propagation.
    let errors = matrix.subtract(targets, outputs);

    for (let i = this.layers.length - 1; i >= 0; i--) {
      errors = this.layers[i].backward(errors);
    }

    return outputs.toArray();
  }

  predict(inputArr) {
    let inputs = matrix.fromArray(inputArr);
    let outputs = inputs;

    for (let i = 0; i < this.layers.length; i++) {
      outputs = this.layers[i].forward(outputs);
    }

    return outputs.toArray();
  }
}

class Layer {
  constructor(inputSize, outputSize, activation, learningRate = 0.1) {
    this.inputSize = inputSize;
    this.outputSize = outputSize;
    this.activation = activation;

    this.weights = new matrix(this.outputSize, this.inputSize);
    this.bias = new matrix(this.outputSize, 1);

    this.weights.randomize();
    this.bias.randomize();

    this.learningRate = learningRate;
  }

  forward(inputs) {
    let outputs = matrix.multiply(this.weights, inputs);
    outputs.add(this.bias);
    outputs.map(this.activation.fn);

    this.outputs = outputs;
    this.inputs = inputs;

    return outputs;
  }

  backward(errors) {
    let gradients = matrix.map(this.outputs, this.activation.dfn);

    gradients.multiplyHadamard(errors);
    gradients.multiplyScalar(this.learningRate);

    let deltas = matrix.multiply(gradients, matrix.transpose(this.inputs));

    this.weights.add(deltas);
    this.bias.add(gradients);

    let weightsT = matrix.transpose(this.weights);

    return matrix.multiply(weightsT, errors);
  }
}

class ActivationFunction {
  constructor(fn, dfn) {
    this.fn = fn;
    this.dfn = dfn;
  }
}

const sigmoid = new ActivationFunction(
  (x) => 1 / (1 + Math.exp(-x)),
  (y) => y * (1 - y)
);

const relu = new ActivationFunction(
  (x) => Math.max(0, x),
  (y) => (y > 0 ? 1 : 0)
);

const tanh = new ActivationFunction(
  (x) => Math.tanh(x),
  (y) => 1 - y * y
);

module.exports = {
  // Network components.
  LayeredNeuralNetwork,
  Layer,
  // Activation functions.
  sigmoid,
  relu,
  tanh,
};
