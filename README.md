# Clothes Dependency Algorithm Challenge

## Explanation

Let's use the following as an example:

```js
const input = [
  ["a", "c"],
  ["a", "d"],
  ["b", "c"],
  ["b", "d"],
  ["c", "d"],
];
```

In this example, the order is:

```
a, b
c
d
```

If we make a hash for the dependency, we get:

```js
dependencyHash = {
  a: ["c", "d"],
  b: ["c", "d"],
  c: ["d"],
};
```

### How to find the clothes to put on first (`startItems`)

The full list of items for the example is `['a', 'b', 'c', 'd']` - this is `allItemsSet`.

`['a', 'b']` are the first items to start. They do not appear in the values of the `dependencyHash`.

So, we can conclude that the items from the `allItemsSet` that do not appear in the values of the `dependencyHash` are the items to start first.

The function [findStartItems](./src/index.ts) solves this.

### How to find the clothes to put on next

After finding the `startItems`, if we remove those `startItems` from the current `allItemsSet` and `dependencyHash`, the clothes to put on next will be the _new_ `startItems` from _new_ `allItemsSet` and _new_ `dependencyHash`.

For our example, after finding that `['a', 'b']` are the `startItems`, let's remove them from the `allItemsSet` and `dependencyHash`.

```js
allItemsSet = ["c", "d"];
dependencyHash = {
  c: ["d"],
};
```

The next clothes to put on will be `['c']`, right?

So we can iterate this process until the `allItemsSet` becomes empty.

---

---

## Submit

You can provide you solution however you see fit.
Some options that we have used in the past are BitBucket, GitHub, https://dotnetfiddle.net/, or a zip file emailed.

Thank and good luck!

## Problem

Create a JavaScript or TypeScript or C# program that solves the following dependency problem:

A person needs to figure out which order his/her clothes need to be put on. 
The person creates a file that contains the dependencies.

This input is a declared array of dependencies with the [0] index being the dependency and the [1] index being the item.

A simple input would be:

```
var input = new string[,]
{
    // Dependency      Item
    {"t-shirt", "dress shirt"},
    {"dress shirt", "pants"},
    {"dress shirt", "suit jacket"},
    {"tie", "suit jacket"},
    {"pants", "suit jacket"},
    {"belt", "suit jacket"},
    {"suit jacket", "overcoat"},
    {"dress shirt", "tie"},
    {"suit jacket", "sun glasses"},
    {"sun glasses", "overcoat"},
    {"left sock", "pants"},
    {"pants", "belt"},
    {"suit jacket", "left shoe"},
    {"suit jacket", "right shoe"},
    {"left shoe", "overcoat"},
    {"right sock", "pants"},
    {"right shoe", "overcoat"},
    {"t-shirt", "suit jacket"}
};

```

In this example, it shows that they must put on their left sock before their pants. Also, 
they must put on their pants before their belt.

From this data, write a program that provides the order that each object needs to be put on.

The output should be a line-delimited list of objects. If there are multiple objects that
can be done at the same time, list each object on the same line, alphabetically 
sorted, comma separated.

Therefore, the output for this sample file would be:

left sock,right sock, t-shirt
dress shirt
pants, tie
belt
suit jacket
left shoe, right shoe, sun glasses
overcoat

## Evaluation Criteria

You will be evaluated on the following criteria:

1. Correctness of the solution
2. Algorithmic, logic, and programming skills
3. Performance considerations
4. Design and code structure (modular, etc)
5. Coding style
6. Usability
7. Testability
8. Documentation
