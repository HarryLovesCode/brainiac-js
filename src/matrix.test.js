const matrix = require("./matrix");

describe("Matrix", () => {
  test("constructor", () => {
    const m = new matrix(2, 3);

    expect(m.rows).toBe(2);
    expect(m.cols).toBe(3);
    expect(m.data).toEqual([
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });

  test("fromArray", () => {
    const m = matrix.fromArray([1, 2, 3]);

    expect(m.rows).toBe(3);
    expect(m.cols).toBe(1);
    expect(m.data).toEqual([[1], [2], [3]]);
  });

  test("randomize (static)", () => {
    const m = matrix.randomize(new matrix(2, 3));

    expect(m.rows).toBe(2);
    expect(m.cols).toBe(3);
    expect(m.data).toEqual([
      [expect.any(Number), expect.any(Number), expect.any(Number)],
      [expect.any(Number), expect.any(Number), expect.any(Number)],
    ]);
  });

  test("toArray", () => {
    const m = new matrix(2, 3);

    expect(m.toArray()).toEqual([0, 0, 0, 0, 0, 0]);
  });

  test("map (static)", () => {
    const m = matrix.fromArray([1, 2, 3]);
    const m2 = matrix.map(m, (value) => value * 2);

    expect(m2.rows).toBe(3);
    expect(m2.cols).toBe(1);
    expect(m2.data).toEqual([[2], [4], [6]]);
  });

  test("map (instance)", () => {
    const m = matrix.fromArray([1, 2, 3]);
    const m2 = m.map((value) => value * 2);

    expect(m2.rows).toBe(3);
    expect(m2.cols).toBe(1);
    expect(m2.data).toEqual([[2], [4], [6]]);
  });

  test("mulitiply (instance)", () => {
    const m = new matrix(2, 3);

    m.data = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const m2 = new matrix(3, 2);

    m2.data = [
      [7, 8],
      [9, 10],
      [11, 12],
    ];

    const m3 = m.multiply(m2);

    expect(m3.rows).toBe(2);
    expect(m3.cols).toBe(2);

    expect(m3.data).toEqual([
      [58, 64],
      [139, 154],
    ]);
  });

  test("multiply (static)", () => {
    const m = new matrix(2, 3);

    m.data = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const m2 = new matrix(3, 2);

    m2.data = [
      [7, 8],
      [9, 10],
      [11, 12],
    ];

    const m3 = matrix.multiply(m, m2);

    expect(m3.rows).toBe(2);
    expect(m3.cols).toBe(2);

    expect(m3.data).toEqual([
      [58, 64],
      [139, 154],
    ]);
  });

  test("multiply Hadamard (static)", () => {
    const m = new matrix(2, 3);

    m.data = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const m2 = new matrix(2, 3);

    m2.data = [
      [7, 8, 9],
      [10, 11, 12],
    ];

    const m3 = matrix.multiplyHadamard(m, m2);

    expect(m3.rows).toBe(2);
    expect(m3.cols).toBe(3);

    expect(m3.data).toEqual([
      [7, 16, 27],
      [40, 55, 72],
    ]);
  });

  test("multiply scalar (static)", () => {
    const m = new matrix(2, 3);

    m.data = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const m2 = matrix.multiplyScalar(m, 2);

    expect(m2.rows).toBe(2);
    expect(m2.cols).toBe(3);

    expect(m2.data).toEqual([
      [2, 4, 6],
      [8, 10, 12],
    ]);
  });

  test("multiply Hadamard (instance)", () => {
    const m = new matrix(2, 3);

    m.data = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const m2 = new matrix(2, 3);

    m2.data = [
      [7, 8, 9],
      [10, 11, 12],
    ];

    const m3 = m.multiplyHadamard(m2);

    expect(m3.rows).toBe(2);
    expect(m3.cols).toBe(3);

    expect(m3.data).toEqual([
      [7, 16, 27],
      [40, 55, 72],
    ]);
  });

  test("multiply scalar (instance)", () => {
    const m = new matrix(2, 3);

    m.data = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const m2 = m.multiplyScalar(2);

    expect(m2.rows).toBe(2);
    expect(m2.cols).toBe(3);

    expect(m2.data).toEqual([
      [2, 4, 6],
      [8, 10, 12],
    ]);
  });

  test("add (instance)", () => {
    const m = new matrix(2, 3);

    m.data = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const m2 = new matrix(2, 3);

    m2.data = [
      [7, 8, 9],
      [10, 11, 12],
    ];

    const m3 = m.add(m2);

    expect(m3.rows).toBe(2);
    expect(m3.cols).toBe(3);

    expect(m3.data).toEqual([
      [8, 10, 12],
      [14, 16, 18],
    ]);
  });

  test("add (static)", () => {
    const m = new matrix(2, 3);

    m.data = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const m2 = new matrix(2, 3);

    m2.data = [
      [7, 8, 9],
      [10, 11, 12],
    ];

    const m3 = matrix.add(m, m2);

    expect(m3.rows).toBe(2);
    expect(m3.cols).toBe(3);

    expect(m3.data).toEqual([
      [8, 10, 12],
      [14, 16, 18],
    ]);
  });

  test("transpose (static)", () => {
    const m = new matrix(2, 3);

    m.data = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const m2 = matrix.transpose(m);

    expect(m2.rows).toBe(3);
    expect(m2.cols).toBe(2);

    expect(m2.data).toEqual([
      [1, 4],
      [2, 5],
      [3, 6],
    ]);
  });

  test("subtract (instance)", () => {
    const m = new matrix(2, 3);

    m.data = [
      [7, 8, 9],
      [10, 11, 12],
    ];

    const m2 = new matrix(2, 3);

    m2.data = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const m3 = m.subtract(m2);

    expect(m3.rows).toBe(2);
    expect(m3.cols).toBe(3);

    expect(m3.data).toEqual([
      [6, 6, 6],
      [6, 6, 6],
    ]);
  });

  test("subtract (static)", () => {
    const m = new matrix(2, 3);

    m.data = [
      [7, 8, 9],
      [10, 11, 12],
    ];

    const m2 = new matrix(2, 3);

    m2.data = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const m3 = matrix.subtract(m, m2);

    expect(m3.rows).toBe(2);
    expect(m3.cols).toBe(3);

    expect(m3.data).toEqual([
      [6, 6, 6],
      [6, 6, 6],
    ]);
  });

  test("serialize", () => {
    const m = new matrix(2, 3);

    m.data = [
      [7, 8, 9],
      [10, 11, 12],
    ];

    expect(m.serialize()).toEqual(
      JSON.stringify({
        rows: 2,
        cols: 3,
        data: [
          [7, 8, 9],
          [10, 11, 12],
        ],
      })
    );
  });

  test("deserialize", () => {
    const m = new matrix(2, 3);

    m.data = [
      [7, 8, 9],
      [10, 11, 12],
    ];

    const m2 = matrix.deserialize(m.serialize());

    expect(m2.rows).toBe(2);
    expect(m2.cols).toBe(3);

    expect(m2.data).toEqual([
      [7, 8, 9],
      [10, 11, 12],
    ]);
  });
});
