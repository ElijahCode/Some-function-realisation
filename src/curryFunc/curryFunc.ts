type Data = number | string | Function | Object | boolean;

interface CurriedFunction1 {
  (t1: number): Data;
}

interface CurriedFunction2 {
  (t1: Data, t2: Data): Data;
  (t1: Data): CurriedFunction1;
}

interface CurriedFunction3 {
  (t1: Data, t2: Data, t3: Data): Data;
  (t1: Data, t2: Data): CurriedFunction1;
  (t1: Data): CurriedFunction2;
}

interface CurriedFunction4 {
  (t1: Data, t2: Data, t3: Data, t4: Data): Data;
  (t1: Data, t2: Data, t3: Data): CurriedFunction1;
  (t1: Data, t2: Data): CurriedFunction2;
  (t1: Data): CurriedFunction3;
}

interface CurriedFunction5 {
  (t1: Data, t2: Data, t3: Data, t4: Data, t5: Data): Data;
  (t1: Data, t2: Data, t3: Data, t4: Data): CurriedFunction1;
  (t1: Data, t2: Data, t3: Data): CurriedFunction2;
  (t1: Data, t2: Data): CurriedFunction3;
  (t1: Data): CurriedFunction4;
}

interface CurriedFunction6 {
  (t1: Data, t2: Data, t3: Data, t4: Data, t5: Data, t6: Data): Data;
  (t1: Data, t2: Data, t3: Data, t4: Data, t5: Data): CurriedFunction1;
  (t1: Data, t2: Data, t3: Data, t4: Data): CurriedFunction2;
  (t1: Data, t2: Data, t3: Data): CurriedFunction3;
  (t1: Data, t2: Data): CurriedFunction4;
  (t1: Data): CurriedFunction5;
}

export type CurriedFunction<T> = T extends [Data, Data, Data, Data, Data, Data]
  ? CurriedFunction6
  : T extends [Data, Data, Data, Data, Data]
  ? CurriedFunction5
  : T extends [Data, Data, Data, Data]
  ? CurriedFunction4
  : T extends [Data, Data, Data]
  ? CurriedFunction3
  : T extends [Data, Data]
  ? CurriedFunction2
  : T extends [Data, Data]
  ? CurriedFunction1
  : never;

export function curryFunc<T extends Data[]>(
  fn: (...args: T) => Data
): CurriedFunction<T>;

export function curryFunc(fun: (...args: any[]) => any): any {
  function curry<K extends Data[]>(...args: K): Data {
    if (args.length >= fun.length) {
      return fun.apply(fun, args);
    }
    return function nextStep<V extends Data[]>(...args2: V): Data {
      return curry.apply(fun, args.concat(args2));
    };
  }

  return curry;
}
