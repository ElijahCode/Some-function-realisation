export class Parallel {
  private flows: number;

  public result: number[];

  constructor(flows: number, result: number[] = []) {
    this.flows = flows;
    this.result = result;
  }

  public async jobs(...fun: Function[]): Promise<number[]> {
    const jobs: Function[] = fun;
    const runOn = async (promise: Promise<number>) => {
      const data = await promise;

      this.result = this.result.concat(data);

      const job = jobs.shift();

      if (job) {
        runOn(job());
      }
    };

    for (let i = 0; i < this.flows; i += 1) {
      const job = jobs.shift();
      if (job) {
        runOn(job());
      }
    }
    return this.result;
  }
}
