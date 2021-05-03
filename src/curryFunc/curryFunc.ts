export function curryFunc(fun: Function): Function {
  function curry(...args: any[]): Function {
    if (args.length >= fun.length) {
      return fun.apply(fun, args);
    }
    return function nextStep(...args2: any[]): Function {
      return curry.apply(fun, args.concat(args2));
    };
  }

  return curry;
}
