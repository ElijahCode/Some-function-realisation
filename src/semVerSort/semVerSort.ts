export function semVerSort(inputData: string[]): string[] {
  function compare(a: string, b: string): number {
    const aArray = a.split(".");
    const bArray = b.split(".");
    // const numbOfCycle = aArray.length > bArray.length ? bArray.length : aArray.length;

    let numbOfCycle;

    if (aArray.length > bArray.length) {
      numbOfCycle = aArray.length;

      while (aArray.length > bArray.length) {
        bArray.push("0");
      }
    } else if (aArray.length < bArray.length) {
      numbOfCycle = bArray.length;

      while (aArray.length < bArray.length) {
        aArray.push("0");
      }
    } else {
      numbOfCycle = aArray.length;
    }

    let result = 0;
    for (let i = 0; i < numbOfCycle; i += 1) {
      if (Number(aArray[i]) > Number(bArray[i])) {
        result = 1;
        break;
      } else if (Number(aArray[i]) < Number(bArray[i])) {
        result = -1;
        break;
      }
    }
    return result;
  }

  return inputData.sort(compare);
}
