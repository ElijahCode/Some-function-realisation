export function curryFunc(fun: (...args: any[]) => any): Function {
  
  function curry (...args: any[]): any {

    if(args.length >= fun.length) {
      return fun.apply(fun, args);
    } else {
    return function nextStep (...args2: any[]): any {
        return curry.apply(fun, args.concat(args2));
      }
    }
  }

  return curry;
}