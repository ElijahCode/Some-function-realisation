import { matrixDeployer } from "./matrixDeployerFunc";

describe("Testing matrixDeployerFunc", () => {
  it("must return [1]", () => {
    expect(matrixDeployer([[1]])).toEqual([1]);
  });
  it("Must return [1, 2, 3, 4]", () => {
    expect(
      matrixDeployer([
        [1, 2],
        [4, 3],
      ])
    ).toEqual([1, 2, 3, 4]);
  });
  it("Must return result", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const result = [1, 2, 3, 6, 9, 8, 7, 4, 5];

    expect(matrixDeployer(matrix)).toEqual(result);
  });
  it("Must return result", () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    const result = [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10];

    expect(matrixDeployer(matrix)).toEqual(result);
  });
});
