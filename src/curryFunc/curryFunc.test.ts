import {curryFunc} from './curryFunc'

function sum(a: number, b:number, c: number, d: number, e: number, f:number): number {
    return a + b + c + d + e + f;
}
 
describe('Testing curryFunc function', () => {
    const currySum = curryFunc(sum);

    it('Must return 21', () => {
        expect(currySum(1, 2 , 3, 4, 5, 6)).toBe(21);
        expect(currySum(1, 2 , 3)(4, 5, 6)).toBe(21);
        expect(currySum(1, 2)(3 , 4)(5, 6)).toBe(21);
        expect(currySum(1)(2)(3)(4)(5)(6)).toBe(21);
    })
})