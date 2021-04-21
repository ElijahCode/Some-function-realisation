/* export function adderFunc (): Function | number  {
    function next (...args: number[]): number | Function {
      return function check(x: number): number | Function {
        if (!x) {
          return args.reduce((acc: number, a: number) => {
            return acc + a;
          }, 0);
        }
        return next(...args, x);
      };
    };
    return next();
}; */

export function adderFunc(addToSum = 0): Function {
  let resultSum: number = addToSum;

  function sum(numb: number): Function | string {
    resultSum = resultSum === 0 ? addToSum : resultSum;

    if (!numb) {
      return `${resultSum}`;
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
