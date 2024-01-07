# Brainiac-JS

This goal of this project was to learn about Neural Networks and demystify the black-box that we often assume they are. In the `index.js` file you will find a simple example of utilizing the network. I will also include it below. The layer system is _extremely_ straight-forward. Essentially, we take the inputs, forward them through all the layers, and then bring them back using back-propagation.

JavaScript was chosen due to my familiarity, but the same principles would apply in any language. There is _no_ error handling in the network itself, so do be aware that your node input
sizes and output sizes need to line up between layers.

While the matrix math could potentially scare entry-level people, it really is not all that complex. For the basis of this, I looked at: [Toy-Neural-Network-JS](https://github.com/CodingTrain/Toy-Neural-Network-JS) to gain an understanding. However, in my implementation, I split up `multiply`, `multiplyHadamard`, and `multiplyScalar` to make it even more clear which operation was being used.

I have to give credit to [SamsonZhang](https://www.youtube.com/watch?v=w8yWXqWQYmU&ab_channel=SamsonZhang) and their video as without it, I probably would have struggled to understand the "flow" of data between layers.

The main reason this is a separate repository from `Toy-Neural-Network-JS` is because I wanted to support configurable numbers of layers rather than fixing the logic to a single input, single hidden, and single output layer. This allows more complex relationships to be created within the network. It also reduces the amount of code required to add future layers.

Also, shoutout to the package: `seedrandom` as it is helpful when debugging to generates consistent random numbers. An issue I had when training using `Toy-Neural-Network-JS` was inconsistent outputs as JavaScript does not allow seeding by default.

```js
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

// OUTPUT: 
// [ 0 ]
// [ 1 ]
// [ 1 ]
// [ 0 ]
```
