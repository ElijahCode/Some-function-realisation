type data = number | string | Function | Object | boolean;

interface CurriedFunction1 {
  (t1: number): data;
}

interface CurriedFunction2 {
  (t1: data, t2: data): data;
  (t1: data): CurriedFunction1;
}

interface CurriedFunction3 {
  (t1: data, t2: data, t3: data): data;
  (t1: data, t2: data): CurriedFunction1;
  (t1: data): CurriedFunction2;
}

interface CurriedFunction4 {
  (t1: data, t2: data, t3: data, t4: data): data;
  (t1: data, t2: data, t3: data): CurriedFunction1;
  (t1: data, t2: data): CurriedFunction2;
  (t1: data): CurriedFunction3;
}

interface CurriedFunction5 {
  (t1: data, t2: data, t3: data, t4: data, t5: data): data;
  (t1: data, t2: data, t3: data, t4: data): CurriedFunction1;
  (t1: data, t2: data, t3: data): CurriedFunction2;
  (t1: data, t2: data): CurriedFunction3;
  (t1: data): CurriedFunction4;
}

interface CurriedFunction6 {
  (t1: data, t2: data, t3: data, t4: data, t5: data, t6: data): data;
  (t1: data, t2: data, t3: data, t4: data, t5: data): CurriedFunction1;
  (t1: data, t2: data, t3: data, t4: data): CurriedFunction2;
  (t1: data, t2: data, t3: data): CurriedFunction3;
  (t1: data, t2: data): CurriedFunction4;
  (t1: data): CurriedFunction5;
}

export type CurriedFunction<T> = T extends [data, data, data, data, data, data]
  ? CurriedFunction6
  : T extends [data, data, data, data, data]
  ? CurriedFunction5
  : T extends [data, data, data, data]
  ? CurriedFunction4
  : T extends [data, data, data]
  ? CurriedFunction3
  : T extends [data, data]
  ? CurriedFunction2
  : T extends [data, data]
  ? CurriedFunction1
  : never;

export function curryFunc<T extends data[]>(
  fn: (...args: T) => data
): CurriedFunction<T>;

export function curryFunc(fun: (...args: any[]) => any): any {
  function curry<K extends data[]>(...args: K): data {
    if (args.length >= fun.length) {
      return fun.apply(fun, args);
    }
    return function nextStep<V extends data[]>(...args2: V): data {
      return curry.apply(fun, args.concat(args2));
    };
  }

  return curry;
}
