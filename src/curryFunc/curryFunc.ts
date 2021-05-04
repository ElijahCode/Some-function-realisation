type inputOutputData = number | string | Function | Object | boolean;

interface CurriedFunction1 {
  (t1: number): inputOutputData;
}

interface CurriedFunction2 {
  (t1: inputOutputData, t2: inputOutputData): inputOutputData;
  (t1: inputOutputData): CurriedFunction1;
}

interface CurriedFunction3 {
  (
    t1: inputOutputData,
    t2: inputOutputData,
    t3: inputOutputData
  ): inputOutputData;
  (t1: inputOutputData, t2: inputOutputData): CurriedFunction1;
  (t1: inputOutputData): CurriedFunction2;
}

interface CurriedFunction4 {
  (
    t1: inputOutputData,
    t2: inputOutputData,
    t3: inputOutputData,
    t4: inputOutputData
  ): inputOutputData;
  (
    t1: inputOutputData,
    t2: inputOutputData,
    t3: inputOutputData
  ): CurriedFunction1;
  (t1: inputOutputData, t2: inputOutputData): CurriedFunction2;
  (t1: inputOutputData): CurriedFunction3;
}

interface CurriedFunction5 {
  (
    t1: inputOutputData,
    t2: inputOutputData,
    t3: inputOutputData,
    t4: inputOutputData,
    t5: inputOutputData
  ): inputOutputData;
  (
    t1: inputOutputData,
    t2: inputOutputData,
    t3: inputOutputData,
    t4: inputOutputData
  ): CurriedFunction1;
  (
    t1: inputOutputData,
    t2: inputOutputData,
    t3: inputOutputData
  ): CurriedFunction2;
  (t1: inputOutputData, t2: inputOutputData): CurriedFunction3;
  (t1: inputOutputData): CurriedFunction4;
}

interface CurriedFunction6 {
  (
    t1: inputOutputData,
    t2: inputOutputData,
    t3: inputOutputData,
    t4: inputOutputData,
    t5: inputOutputData,
    t6: inputOutputData
  ): inputOutputData;
  (
    t1: inputOutputData,
    t2: inputOutputData,
    t3: inputOutputData,
    t4: inputOutputData,
    t5: inputOutputData
  ): CurriedFunction1;
  (
    t1: inputOutputData,
    t2: inputOutputData,
    t3: inputOutputData,
    t4: inputOutputData
  ): CurriedFunction2;
  (
    t1: inputOutputData,
    t2: inputOutputData,
    t3: inputOutputData
  ): CurriedFunction3;
  (t1: inputOutputData, t2: inputOutputData): CurriedFunction4;
  (t1: inputOutputData): CurriedFunction5;
}

export type CurriedFunction<T> = T extends [
  inputOutputData,
  inputOutputData,
  inputOutputData,
  inputOutputData,
  inputOutputData,
  inputOutputData
]
  ? CurriedFunction6
  : T extends [
      inputOutputData,
      inputOutputData,
      inputOutputData,
      inputOutputData,
      inputOutputData
    ]
  ? CurriedFunction5
  : T extends [
      inputOutputData,
      inputOutputData,
      inputOutputData,
      inputOutputData
    ]
  ? CurriedFunction4
  : T extends [inputOutputData, inputOutputData, inputOutputData]
  ? CurriedFunction3
  : T extends [inputOutputData, inputOutputData]
  ? CurriedFunction2
  : T extends [inputOutputData, inputOutputData]
  ? CurriedFunction1
  : never;

export function curryFunc<T extends inputOutputData[]>(
  fn: (...args: T) => inputOutputData
): CurriedFunction<T>;

export function curryFunc(fun: (...args: any[]) => any): any {
  function curry<K extends inputOutputData[]>(...args: K): inputOutputData {
    if (args.length >= fun.length) {
      return fun.apply(fun, args);
    }
    return function nextStep<V extends inputOutputData[]>(
      ...args2: V
    ): inputOutputData {
      return curry.apply(fun, args.concat(args2));
    };
  }

  return curry;
}
