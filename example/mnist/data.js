const fs = require("fs/promises");
const path = require("path");

const files = {
  testImages: "./t10k-images.idx3-ubyte",
  testLabels: "./t10k-labels.idx1-ubyte",
  trainImages: "./train-images.idx3-ubyte",
  trainLabels: "./train-labels.idx1-ubyte",
};

async function loadFile(filePath) {
  const p = path.join(__dirname, filePath);
  const buffer = await fs.readFile(p);
  const arrayBuffer = Uint8Array.from(buffer);
  const dataView = new DataView(arrayBuffer.buffer, 0);
  const headers = {
    magicNumber: dataView.getUint32(0),
    numItems: dataView.getUint32(4),
  };

  if (headers.magicNumber === 2051) {
    headers.numRows = dataView.getUint32(8);
    headers.numCols = dataView.getUint32(12);
    headers.images = [];

    for (let i = 0; i < headers.numItems; i++) {
      const offset = 16 + i * headers.numRows * headers.numCols;
      const pixels = [];

      for (let j = 0; j < headers.numRows * headers.numCols; j++) {
        const value = arrayBuffer[offset + j];
        pixels.push(value / 255);
      }

      headers.images.push(pixels);
    }
  }

  if (headers.magicNumber === 2049) {
    headers.numLabels = dataView.getUint32(8);

    headers.labels = [];

    for (let i = 0; i < headers.numItems; i++) {
      headers.labels.push(arrayBuffer[8 + i]);
    }
  }

  return headers;
}

async function loadFiles() {
  const output = {};

  for (let file in files) {
    output[file] = await loadFile(files[file]);
  }

  return output;
}

module.exports = loadFiles;
