const cliProgress = require("cli-progress");
const loadFiles = require("./data.js");

const { LayeredNeuralNetwork, Layer, sigmoid } = require("../../src/nn");

const nn = new LayeredNeuralNetwork([
  new Layer(784, 64, sigmoid),
  new Layer(64, 64, sigmoid),
  new Layer(64, 10, sigmoid),
]);

async function test() {
  const files = await loadFiles();

  const { testImages, testLabels } = files;

  let correct = 0;

  for (let i = 0; i < testImages.numItems; i++) {
    const inputs = testImages.images[i];
    const target = testLabels.labels[i];

    const outputs = nn.predict(inputs);
    const guess = outputs.indexOf(Math.max(...outputs));

    if (guess === target) {
      correct++;
    }
  }

  console.log(`Testing accuracy: ${correct / testImages.numItems}\n`);
}

async function train() {
  const pb = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  const files = await loadFiles();
  const { trainImages, trainLabels } = files;

  for (let epochs = 0; epochs < 10; epochs++) {
    console.log(`Starting epoch ${epochs}...`);
    pb.start(trainImages.numItems, 0);

    for (let i = 0; i < trainImages.numItems; i++) {
      const inputs = trainImages.images[i];
      const targets = new Array(10).fill(0);
      targets[trainLabels.labels[i]] = 1;

      nn.train(inputs, targets);
      pb.update(i);
    }

    pb.stop();

    console.log("Epoch complete.");

    await test();
  }
}

train();
