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

  serialize() {
    const layers = [];

    for (let i = 0; i < this.layers.length; i++) {
      layers.push(this.layers[i].serialize());
    }

    return JSON.stringify(layers);
  }

  static deserialize(data) {
    if (typeof data == "string") {
      data = JSON.parse(data);
    }

    const layers = [];

    for (let i = 0; i < data.length; i++) {
      layers.push(Layer.deserialize(data[i]));
    }

    return new LayeredNeuralNetwork(layers);
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

  serialize() {
    return JSON.stringify(this);
  }

  static deserialize(data) {
    if (typeof data == "string") {
      data = JSON.parse(data);
    }

    let layer = new Layer(data.inputSize, data.outputSize, data.activation);

    layer.weights = matrix.deserialize(data.weights);
    layer.bias = matrix.deserialize(data.bias);

    return layer;
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

const leakyRelu = new ActivationFunction(
  (x, alpha = 0.001) => Math.max(alpha * x, x),
  (y, alpha = 0.001) => (y > 0 ? 1 : alpha)
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
  leakyRelu,
  tanh,
};
