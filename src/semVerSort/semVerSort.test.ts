import { semVerSort } from "./semVerSort";

describe("Testing semVerSort function", () => {
  it('Must return ["1.2.3", "2.3.4"]', () => {
    const inputData = ["2.3.4", "1.2.3"];

    expect(semVerSort(inputData)).toEqual(["1.2.3", "2.3.4"]);
  });

  it("Test with hard inputData", () => {
    const inputData = [
      "1.0.5",
      "2.5.0",
      "0.12.0",
      "1",
      "1.23.45",
      "1.4.50",
      "1.2.3.4.5.6.7",
    ];
    const result = [
      "0.12.0",
      "1",
      "1.0.5",
      "1.2.3.4.5.6.7",
      "1.4.50",
      "1.23.45",
      "2.5.0",
    ];

    expect(semVerSort(inputData)).toEqual(result);
  });
});
