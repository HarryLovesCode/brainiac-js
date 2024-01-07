const { LayeredNeuralNetwork, Layer, relu, sigmoid } = require("./nn");

const nn = new LayeredNeuralNetwork([
  new Layer(2, 8, sigmoid), // 2 inputs.
  new Layer(8, 8, sigmoid), // 8 hidden nodes.
  new Layer(8, 8, sigmoid), // 8 hidden nodes.
  new Layer(8, 1, relu), // 1 output.
]);

for (let i = 0; i < 10000; i++) {
  nn.train([0, 0], [0]);
  nn.train([0, 1], [1]);
  nn.train([1, 0], [1]);
  nn.train([1, 1], [0]);
}

console.log(nn.predict([0, 0]));
console.log(nn.predict([0, 1]));
console.log(nn.predict([1, 0]));
console.log(nn.predict([1, 1]));
