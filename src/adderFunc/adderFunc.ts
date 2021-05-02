export interface IAdderFunc {
  (numb: number): IAdderFunc;
  (): string;
}

export function adderFunc(numb?: number): IAdderFunc;

export function adderFunc(addToSum = 0): Function {
  let resultSum: number = addToSum;

  function sum(numb: number | undefined): Function | string {
    resultSum = resultSum === 0 ? addToSum : resultSum;

    if (!numb) {
      const returnedRes = resultSum;
      resultSum = 0;
      return `${returnedRes}`;
    }

    resultSum += numb;

    return sum;
  }
  sum.toString = function returnResultSum(): string {
    const result: number = resultSum;
    resultSum = 0;
    return `${result}`;
  };

  return sum;
}
