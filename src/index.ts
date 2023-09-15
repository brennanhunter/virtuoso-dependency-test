// find items that are in set1, but not in set2
export const findItemsInSet1NotInSet2 = (set1: Set<string>, set2: Set<string>): Array<string> => {
  const result: Array<string> = [];
  for (const item of set1) {
    if (!set2.has(item)) {
      result.push(item);
    }
  }
  return result;
};

// find startItems for current allItemsSet and dependencyHash
export const findStartItems = (
  allItemsSet: Set<string>,
  dependencyHash: { [key: string]: Array<string> }
): Array<string> => {
  const nextItems = new Set(Object.values(dependencyHash).flat());
  return findItemsInSet1NotInSet2(allItemsSet, nextItems);
};

/**
 * The startItems are removed from allItemsSet and dependencyHash inline.
 * The best practice is to make pure functions, but to improve performance,
 * allItemsSet and dependencyHash are updated inline.
 */
export const removePrevStartItems = (
  allItemsSet: Set<string>,
  dependencyHash: { [key: string]: Array<string> },
  startItems: Array<string>
): void => {
  for (const item of startItems) {
    allItemsSet.delete(item);
    delete dependencyHash[item];
  }
};

/**
 *
 * @param input The dependency items array input
 * @returns The solved dependency in order
 */
const solveDependency = (input: Array<[string, string]>) => {
  const allItemsSet = new Set(input.flat().sort((a, b) => (a > b ? 1 : -1)));
  const dependencyHash: { [key: string]: Array<string> } = {};
  const result: Array<string> = [];

  for (const dependencyItem of input) {
    const [prev, next] = dependencyItem;
    dependencyHash[prev] = [...(dependencyHash[prev] ?? []), next];
  }

  while (!!allItemsSet.size) {
    const startItems = findStartItems(allItemsSet, dependencyHash);
    result.push(startItems.join(", "));
    removePrevStartItems(allItemsSet, dependencyHash, startItems);
  }

  return result.join("\n");
};

export default solveDependency;

// console.log(
//   solveDependency([
//     ["t-shirt", "dress shirt"],
//     ["dress shirt", "pants"],
//     ["dress shirt", "suit jacket"],
//     ["tie", "suit jacket"],
//     ["pants", "suit jacket"],
//     ["belt", "suit jacket"],
//     ["suit jacket", "overcoat"],
//     ["dress shirt", "tie"],
//     ["suit jacket", "sun glasses"],
//     ["sun glasses", "overcoat"],
//     ["left sock", "pants"],
//     ["pants", "belt"],
//     ["suit jacket", "left shoe"],
//     ["suit jacket", "right shoe"],
//     ["left shoe", "overcoat"],
//     ["right sock", "pants"],
//     ["right shoe", "overcoat"],
//     ["t-shirt", "suit jacket"],
//   ])
// );
