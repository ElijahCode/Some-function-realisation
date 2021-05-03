import {Parallel} from './ParallelClass'


const sleep = (x: number) => new Promise((resolve) => setTimeout(resolve, x));
    

it('Test Parallel class', async () => {
    const runner = new Parallel(2);

    await runner.jobs(
        () => new Promise((resolve) => setTimeout(resolve, 10, 1)),
        () => new Promise((resolve) => setTimeout(resolve, 50, 2)),
        () => new Promise((resolve) => setTimeout(resolve, 20, 3)),
        () => new Promise((resolve) => setTimeout(resolve, 90, 4)),
        () => new Promise((resolve) => setTimeout(resolve, 30, 5)),
    )

    await sleep(500);

    expect(runner.result).toEqual([ 1, 3, 2, 5, 4 ]);
    
})
