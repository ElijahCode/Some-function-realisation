export function matrixDeployer(matrix: number[][]): number[] {
  const initResult: number[] = [];

  function next(currMatrix: number[][], result: number[]): number[] {
    if (!(currMatrix[0] && currMatrix[0][0])) {
      return result;
    }

    if (currMatrix.length === 1) {
      result.push(currMatrix[0][0]);
      return result;
    }

    const innerResult: number[] = [];
    const cutMatrix: number[][] = [...currMatrix];

    cutMatrix.shift()?.forEach((elem) => {
      innerResult.push(elem);
    });

    cutMatrix.forEach((element) => {
      const lastElem = element.pop();
      if (lastElem) {
        innerResult.push(lastElem);
      }
    });

    cutMatrix
      .pop()
      ?.reverse()
      .forEach((elem) => {
        innerResult.push(elem);
      });

    const lastPart = cutMatrix.reduce((acc, elem) => {
      const firstElem = elem.shift();
      if (firstElem) {
        acc.push(firstElem);
      }
      return acc;
    }, []);

    lastPart.reverse().forEach((elem) => {
      innerResult.push(elem);
    });

    return next(cutMatrix, result.concat(innerResult));
  }

  return next(matrix, initResult);
}
