export function curryFunc(fun: (...args: number[]) => number): Function {
  function curry(...args: number[]): number | Function {
    if (args.length >= fun.length) {
      return fun.apply(fun, args);
    }
    return function nextStep(...args2: number[]): number | Function {
      return curry.apply(fun, args.concat(args2));
    };
  }

  return curry;
}
