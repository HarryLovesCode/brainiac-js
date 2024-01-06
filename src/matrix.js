const seedRandom = require("seedrandom");
const rng = new seedRandom(42);

class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = new Array(this.rows)
      .fill()
      .map(() => new Array(this.cols).fill(0));
  }

  /**
   * Creates a copy of the matrix by creating a new one with the same dimensions
   * then mapping each index to the value of the original matrix.
   *
   * @returns Cloned matrix.
   */
  clone() {
    return new Matrix(this.rows, this.cols).map((_, i, j) => this.data[i][j]);
  }

  /**
   * Converts an array to a matrix. Note this will produce a column matrix
   * with only one row.
   *
   * @param {Array} data The array to convert to a matrix.
   *
   * @returns The converted matrix.
   */
  static fromArray(data) {
    return new Matrix(data.length, 1).map((_, i) => data[i]);
  }

  /**
   * Static method for adding two matrices together by mapping each index
   * to the sum of the two indices.
   *
   * @param {Matrix} a Left most matrix.
   * @param {Matrix} b Right most matrix.
   *
   * @returns The sum of the two matrices.
   */
  static add(a, b) {
    if (a.rows !== b.rows || a.cols !== b.cols) {
      throw new Error(
        "Columns and Rows of A must match Columns and Rows of B."
      );
    }

    return new Matrix(a.rows, a.cols).map(
      (_, i, j) => a.data[i][j] + b.data[i][j]
    );
  }

  /**
   * Static method for subtracting two matrices by mapping each index
   * to the difference of the two indices.
   *
   * @param {Matrix} a Left most matrix.
   * @param {Matrix} b Right most matrix.
   *
   * @returns The difference of the two matrices.
   */
  static subtract(a, b) {
    if (a.rows !== b.rows || a.cols !== b.cols) {
      throw new Error(
        "Columns and Rows of A must match Columns and Rows of B."
      );
    }

    return new Matrix(a.rows, a.cols).map(
      (_, i, j) => a.data[i][j] - b.data[i][j]
    );
  }

  /**
   * Returns a matrix with the same dimensions as the original matrix.
   * The elements of this matrix are the same before, but with a function
   * applied to that element. This is useful for most functions in this class
   * that require a new matrix to be returned.
   *
   * @param {Matrix} matrix
   * @param {Function} fn Function that takes in the value, row, and column.
   *
   * @returns
   */
  static map(matrix, fn) {
    return new Matrix(matrix.rows, matrix.cols).map((_, i, j) =>
      fn(matrix.data[i][j], i, j)
    );
  }

  /**
   * Returns a matrix with the same dimensions as the original matrix.
   * However, now each element is a random number between -1 and 1. This is
   * useful for initializing weights and biases.
   *
   * @param {Matrix} matrix
   * @returns
   */
  static randomize(matrix) {
    return new Matrix(matrix.rows, matrix.cols).map(
      () => rng() * 2 - 1
    );
  }

  /**
   * Returns a matrix that represents the products of the two matrices.
   *
   * @param {Matrix} a Left most matrix.
   * @param {Matrix} b Right most matrix.
   *
   * @returns Matrix product.
   */
  static multiply(a, b) {
    if (a.cols !== b.rows) {
      console.log(a, b);
      throw new Error("Columns of A must match rows of B.");
    }

    return new Matrix(a.rows, b.cols).map((_, i, j) => {
      let sum = 0;

      for (let k = 0; k < a.cols; k++) {
        sum += a.data[i][k] * b.data[k][j];
      }

      return sum;
    });
  }

  /**
   * Returns a new matrix that is the Hadamard product of the two matrices.
   * Essentially, this means that each element of the new matrix is the product
   * of the two matrices at the same index. This operation, unlike normal matrix
   * multiplication, can be done in any order.
   *
   * @param {Matrix} a Left most matrix.
   * @param {Matrix} b Right most matrix.
   *
   * @returns Hadamard product.
   */
  static multiplyHadamard(a, b) {
    return new Matrix(a.rows, a.cols).map(
      (_, i, j) => a.data[i][j] * b.data[i][j]
    );
  }

  /**
   * Returns a new matrix with each element multiplied by a scalar value.
   *
   * @param {Matrix} a Matrix to multiply.
   * @param {Number} n Scalar value to multiply by.
   *
   * @returns Scaled matrix.
   */
  static multiplyScalar(a, n) {
    return new Matrix(a.rows, a.cols).map((_, i, j) => a.data[i][j] * n);
  }

  /**
   * Returns a new matrix that is the transpose of the original matrix.
   * Essentially swapping the rows and columns.
   *
   * @param {Matrix} matrix
   *
   * @returns Transposed matrix.
   */
  static transpose(matrix) {
    return new Matrix(matrix.cols, matrix.rows).map(
      (_, i, j) => matrix.data[j][i]
    );
  }

  /**
   * Adds a matrix or scalar value to the original matrix.
   *
   * @param {Matrix | Number} n Right most matrix to add or scalar value to add to each element.
   *
   * @returns The original matrix with the addition.
   */
  add(n) {
    if (n instanceof Matrix) {
      if (this.rows !== n.rows || this.cols !== n.cols) {
        throw new Error(
          "Columns and Rows of A must match Columns and Rows of B."
        );
      }

      return this.map((val, i, j) => val + n.data[i][j]);
    } else {
      return this.map((val) => val + n);
    }
  }

  /**
   * Subtracts a matrix or scalar value from the original matrix.
   *
   * @param {Matrix | Number} n Right most matrix to subtract or scalar value to subtract from each element.
   *
   * @returns The original matrix with the subtraction.
   */
  subtract(n) {
    if (n instanceof Matrix) {
      if (this.rows !== n.rows || this.cols !== n.cols) {
        throw new Error(
          "Columns and Rows of A must match Columns and Rows of B."
        );
      }

      return this.map((val, i, j) => val - n.data[i][j]);
    } else {
      return this.map((val) => val - n);
    }
  }

  /**
   * Flattens the matrix into a one dimensional array.
   *
   * @returns Flattened array elements of the matrix.
   */
  toArray() {
    return this.data.flat();
  }

  /**
   * Same as the original, static `map` method. However, this method
   * mutates the original matrix.
   *
   * @param {Function} func Function that takes in the value, row, and column.
   *
   * @returns The original matrix with the function applied to each element.
   */
  map(func) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let val = this.data[i][j];
        this.data[i][j] = func(val, i, j);
      }
    }

    return this;
  }

  /**
   * Returns this matrix that is now the product of the original matrix and the
   * argument matrix. The number of columns of the original matrix must match
   * the number of rows of the argument matrix.
   *
   * @param {Matrix} b Right most matrix to multiply.
   *
   * @returns Product of the two matrices.
   */
  multiply(b) {
    if (this.cols !== b.rows) {
      throw new Error("Columns of initial matrix must match rows of argument.");
    }

    return new Matrix(this.rows, b.cols).map((_, i, j) => {
      let sum = 0;

      for (let k = 0; k < this.cols; k++) {
        sum += this.data[i][k] * b.data[k][j];
      }

      return sum;
    });
  }

  randomize() {
    return this.map(() => rng() * 2 - 1);
  }

  /**
   * Returns this matrix with the Hadamard product of the argument matrix.
   * Essentially, this means that each element of the new matrix is the product
   * of the two matrices at the same index. This operation, unlike normal matrix
   * multiplication, can be done in any order.
   *
   * @param {Matrix} b Right most matrix to multiply.
   *
   * @returns Hadamard product of the two matrices.
   */
  multiplyHadamard(b) {
    this.map((val, i, j) => val * b.data[i][j]);
    return this;
  }

  /**
   * Returns this matrix with each element multiplied by a scalar value.
   *
   * @param {Number} n Scalar value to multiply by.
   *
   * @returns Scaled matrix.
   */
  multiplyScalar(n) {
    this.map((val) => val * n);
    return this;
  }

  /**
   * Logs the contents of the matrix to the console in a table format.
   **/
  log() {
    console.table(this.data);
    return this;
  }

  /**
   * Serializes the `Matrix` object into a JSON string.
   *
   * @returns Serialized matrix.
   */
  serialize() {
    return JSON.stringify(this);
  }

  /**
   * Deserializes the JSON string or clones the exisitng object into a `Matrix` object.
   *
   * @param {String | Object} data JSON string to deserialize.
   *
   * @returns Deserialized matrix.
   */
  static deserialize(data) {
    if (typeof data == "string") {
      data = JSON.parse(data);
    }

    const matrix = new Matrix(data.rows, data.cols);
    matrix.data = data.data;

    return matrix;
  }
}

module.exports = Matrix;
