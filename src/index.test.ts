import solveDependency, { findItemsInSet1NotInSet2, findStartItems, removePrevStartItems } from ".";

import { setsAreEqual } from "./test.util";

describe("dependency", () => {
  test("findItemsInSet1NotInSet2 should work fine", () => {
    const set1 = new Set(["a", "b", "c", "d"]);
    const set2 = new Set(["b", "c", "e"]);
    expect(findItemsInSet1NotInSet2(set1, set2)).toEqual(["a", "d"]);
  });

  describe("findStartItems and removePrevStartItems", () => {
    const testCases: Array<{
      allItemsSet: Set<string>;
      dependencyHash: { [key: string]: Array<string> };
      expectedStartItems: Array<string>;
      expectedNextAllItemsSet: Set<string>;
      expectedNextDependencyHash: { [key: string]: Array<string> };
    }> = [
      {
        allItemsSet: new Set(["a", "b", "c"]),
        dependencyHash: {
          a: ["b", "c"],
          b: ["c"],
        },
        expectedStartItems: ["a"],
        expectedNextAllItemsSet: new Set(["b", "c"]),
        expectedNextDependencyHash: {
          b: ["c"],
        },
      },
      {
        allItemsSet: new Set(["c"]),
        dependencyHash: {},
        expectedStartItems: ["c"],
        expectedNextAllItemsSet: new Set(),
        expectedNextDependencyHash: {},
      },
    ];
    test.each(testCases)(
      "findStartItems and removePrevStartItems should work fine",
      ({
        allItemsSet,
        dependencyHash,
        expectedStartItems,
        expectedNextAllItemsSet,
        expectedNextDependencyHash,
      }) => {
        const startItems = findStartItems(allItemsSet, dependencyHash);
        removePrevStartItems(allItemsSet, dependencyHash, startItems);

        expect(startItems).toEqual(expectedStartItems);
        expect(setsAreEqual(allItemsSet, expectedNextAllItemsSet)).toBe(true);
        expect(dependencyHash).toEqual(expectedNextDependencyHash);
      }
    );
  });

  describe("solveDependency", () => {
    const testCases: Array<{
      input: Array<[string, string]>;
      result: string;
    }> = [
      {
        input: [
          ["t-shirt", "dress shirt"],
          ["dress shirt", "pants"],
          ["dress shirt", "suit jacket"],
          ["tie", "suit jacket"],
          ["pants", "suit jacket"],
          ["belt", "suit jacket"],
          ["suit jacket", "overcoat"],
          ["dress shirt", "tie"],
          ["suit jacket", "sun glasses"],
          ["sun glasses", "overcoat"],
          ["left sock", "pants"],
          ["pants", "belt"],
          ["suit jacket", "left shoe"],
          ["suit jacket", "right shoe"],
          ["left shoe", "overcoat"],
          ["right sock", "pants"],
          ["right shoe", "overcoat"],
          ["t-shirt", "suit jacket"],
        ],
        result: `left sock, right sock, t-shirt
dress shirt
pants, tie
belt
suit jacket
left shoe, right shoe, sun glasses
overcoat`,
      },
      {
        input: [
          ["a", "c"],
          ["a", "d"],
          ["b", "c"],
          ["b", "d"],
          ["c", "d"],
        ],
        result: `a, b
c
d`,
      },
    ];

    test.each(testCases)("solveDependency should work fine", ({ input, result }) => {
      expect(solveDependency(input)).toBe(result);
    });
  });
});
