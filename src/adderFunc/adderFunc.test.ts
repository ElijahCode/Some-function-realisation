import { adderFunc } from "./adderFunc";

describe("Testing adderFunc", () => {
  const sum = adderFunc();
  it("Return 0", () => {
    expect(sum()).toBe(0);
  });
  it("Return 1", () => {
    expect(sum(1).valueOf()).toBe(1);
  });
  it("Return 3", () => {
    expect(sum(1)(2).valueOf()).toBe(3);
  });
  it("Return 6", () => {
    expect(sum(1)(2)(3).valueOf()).toBe(6);
  });
  it("Return 6 with call sum(1)(2)(3)()", () => {
    expect(sum(1)(2)(3)()).toBe(6);
  });
});

describe("Testing adderFunc with init value", () => {
  const sum = adderFunc(3);

  it("Return 3", () => {
    expect(sum()).toBe(3);
  });
  it("Return 4", () => {
    expect(sum(1).valueOf()).toBe(4);
  });
  it("Return 6", () => {
    expect(sum(1)(2).valueOf()).toBe(6);
  });
  it("Return 9", () => {
    expect(sum(1)(2)(3).valueOf()).toBe(9);
  });
  it("Return 9 with call sum(1)(2)(3)()", () => {
    expect(sum(1)(2)(3)()).toBe(9);
  });
});
