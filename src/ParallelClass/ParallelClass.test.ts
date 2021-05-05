import { Parallel } from "./ParallelClass";

const sleep = (x: number) => new Promise((resolve) => setTimeout(resolve, x));

describe("Parallel", () => {
  it("is a class", () => {
    expect(Parallel).toBeInstanceOf(Function);
    expect(new Parallel(2)).toBeInstanceOf(Parallel);
  });

  it("has method .jobs", () => {
    expect(new Parallel(1).jobs).toBeInstanceOf(Function);
    expect(new Parallel(1).jobs()).toBeInstanceOf(Promise);
  });

  it("runs all jobs", async () => {
    const jobs = [jest.fn(), jest.fn(), jest.fn()];
    await new Parallel(2).jobs(...jobs);
    jobs.forEach((job) => expect(job).toHaveBeenCalled());
  });

  it("runs acceptance test", async () => {
    const jobs = [
      () => new Promise((resolve) => setTimeout(resolve, 10, 1)),
      () => new Promise((resolve) => setTimeout(resolve, 50, 2)),
      () => new Promise((resolve) => setTimeout(resolve, 20, 3)),
      () => new Promise((resolve) => setTimeout(resolve, 90, 4)),
      () => new Promise((resolve) => setTimeout(resolve, 30, 5)),
    ];

    const runner = new Parallel(2);
    await runner.jobs(...jobs);

    await sleep(500);

    expect(runner.result).toEqual([1, 3, 2, 5, 4]);
  });

  [1, 2, 3, 4, 5].forEach((maxJobs) =>
    it(`runs not more than x (${maxJobs}) jobs in time`, async () => {
      const parallel = new Parallel(maxJobs);
      let jobsCounter = 0;
      let maxJobsCounter = 0;
      const jobs = [...Array.from({ length: 10 })].map(
        (_, index) => async () => {
          jobsCounter += 1;
          maxJobsCounter = Math.max(jobsCounter, maxJobsCounter);
          await sleep(index * 10);
          maxJobsCounter = Math.max(jobsCounter, maxJobsCounter);
          jobsCounter -= 1;
        }
      );
      await parallel.jobs(...jobs);
      expect(maxJobsCounter).toBeLessThanOrEqual(maxJobs);
    })
  );

  it("runs tasks as soon as possible", async () => {
    const parallel = new Parallel(2);
    const jobsInOrder: number[] = [];
    let jobsLine = "";
    const jobs = [...Array.from({ length: 9 })].map((_, index) => {
      const jobId = index + 1;
      const jobDuration = index + (index % 2 === 0 ? 1 : 5);
      jobsLine += `${jobId}`.repeat(jobDuration);
      return async () => {
        await sleep(jobDuration * 30);
        jobsInOrder.push(jobId);
      };
    });
    expect(jobsLine).toBe(
      "1222222333444444445555566666666667777777888888888888999999999"
    );
    await parallel.jobs(...jobs);
    await sleep(1000);

    expect(jobsInOrder).toEqual([1, 3, 2, 5, 4, 7, 6, 9, 8]);
  });
});
