import { Parallel } from "./ParallelClass";

const sleep = (x: number) => new Promise((resolve) => setTimeout(resolve, x));

it("Test Parallel class with 2 flows", async () => {
  const runner = new Parallel(2);

  await runner.jobs(
    () => new Promise((resolve) => setTimeout(resolve, 10, 1)),
    () => new Promise((resolve) => setTimeout(resolve, 50, 2)),
    () => new Promise((resolve) => setTimeout(resolve, 20, 3)),
    () => new Promise((resolve) => setTimeout(resolve, 90, 4)),
    () => new Promise((resolve) => setTimeout(resolve, 30, 5))
  );

  await sleep(500);

  expect(runner.result).toEqual([1, 3, 2, 5, 4]);
});

it("Test Parallel class with 3 flows", async () => {
  const runner = new Parallel(3);

  await runner.jobs(
    () => new Promise((resolve) => setTimeout(resolve, 10, 1)),
    () => new Promise((resolve) => setTimeout(resolve, 50, 2)),
    () => new Promise((resolve) => setTimeout(resolve, 20, 3)),
    () => new Promise((resolve) => setTimeout(resolve, 90, 4)),
    () => new Promise((resolve) => setTimeout(resolve, 30, 5)),
    () => new Promise((resolve) => setTimeout(resolve, 60, 6))
  );

  await sleep(500);

  expect(runner.result).toEqual([1, 3, 2, 5, 4, 6]);
});

it("Test Parallel class with 4 flows", async () => {
  const runner = new Parallel(4);

  await runner.jobs(
    () => new Promise((resolve) => setTimeout(resolve, 10, 1)),
    () => new Promise((resolve) => setTimeout(resolve, 50, 2)),
    () => new Promise((resolve) => setTimeout(resolve, 20, 3)),
    () => new Promise((resolve) => setTimeout(resolve, 90, 4)),
    () => new Promise((resolve) => setTimeout(resolve, 30, 5)),
    () => new Promise((resolve) => setTimeout(resolve, 60, 6)),
    () => new Promise((resolve) => setTimeout(resolve, 90, 7)),
    () => new Promise((resolve) => setTimeout(resolve, 15, 8))
  );

  await sleep(500);

  expect(runner.result).toEqual([1, 3, 5, 2, 8, 6, 4, 7]);
});
