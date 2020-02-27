# Guidelines for typing in TypeScript

## Where to store types specific to a repository

When types are shared between modules and used sparsely, create a `src/types.ts` file
as per TypeScript's conventions, where you will pile up all the common types.

Presumably you will also build a declaration at `lib/types.d.ts`.
If your repository hosts a library, then it will be useful to have those types easily imported into parent modules.
Consider adding `types.d.ts` in the root of your repository with the content `export * from './lib/types.d.ts';`,
since this will make parent modules be able to write `import {FunkyType} from 'funky-module/types';`.


## Casting and guards

At times, you may need to clarify to typescript that a variable is certainly of a specific type within a block.

```typescript
let fn = function(a: boolean | string): boolean {
  if (typeof (a as string).match === 'function') {
    a = a as string;
    return a.match(/^true$/) === null;
  }
  return a;
};
```

Similarly, you may use:

* the `in` operator e.g. `if ('match' in a)`
* the `typeof` guard e.g. `if (typeof a === 'string')`
* the `instanceof` guard e.g. `let a = new String('foo'); if (a instanceof String`
* `if ((a as any).match) { a = a as string; ...`
* `if ((a as any).match) { a = a as unknown as string; ...` (in extreme cases)

[Read more about this.](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types)


## Use type assertions to `unknown` when the going gets tough

At times, you may hit issues because of type mismatching.

If you are certain that the implementation is correct (but maybe the typing is only partially correct),
rather than falling back to `// @ts-ignore`, use a type assertion to `unknown` and then to the intended type.

If you've never heard of the type `unknown`, see the [section below](#unknown).

```typescript
type Person = {
  name: string;
  gender: string;
};

let fn = function(): Person {
  // Partial<Person> is a Person type with all properties optional
  let p = {} as Partial<Person>;
  p.name = 'Luiza';
  p.gender = 'unspecified';

  // will complain that Partial<Person> does not match Person
  // return p;

  // since you are certain that p will actually have all the required properties, you can
  return p as unknown as Person;
};
```

## Don't forget mapped types generics

Generics are good for mapping types
e.g. `type MaybePromise<T> = T | Promise<T>` allows for `let a: MaybePromise<void>`, `let b: MaybePromise<number>`, etc.

But they are also good for creating type inferences in function signatures e.g.

```typescript
let identity = function<T>(a: T): T {
  return a;
};

// PS: Naïve example. TypeScript would have perfectly inferred the type, yes.
```


## `unknown`

Use `unknown` as much as possible, and not `any`.

`unknown` is the perfect default type, when you cannot proxy types

Whenever an `unknown` variable will be used (e.g. access a property) or passed onto a function with a type constraint,
typescript will force you to cast it, and thus keep your code safely typed. `any` on the otherhand would allow anything.

[Read more about the unknown type.](https://mariusschulz.com/blog/the-unknown-type-in-typescript)


## Use utility types

Newer versions of TypeScript have opened up the possibility for so-called utility types e.g.

* `Partial<T>` would be a type for a partial object of type T
* `ReturnType<T>` would be the type of the return value of a function of type T

Similarly to the built-in types, more utility-types exist as external packages:
  * our own collection: https://github.com/tobiipro/lodash-firecloud/blob/master/src/types.ts
  * built-in utility types: https://codewithstyle.info/Comprehensive-list-of-useful-built-in-types-in-TypeScript/
  * extension of utility types: https://github.com/piotrwitek/utility-types
  * **comprehensive** but can easily throw TypeScript errors because of high complexity: https://github.com/pirix-gh/ts-toolbelt

[Read more about utility types here.](https://www.typescriptlang.org/docs/handbook/utility-types.html).


## Amend modules and interfaces (and classes)

Sometimes external modules have incorrect types, and you need to amend their interfaces

or to amend classes e.g.

```typescript
interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  constructor(h: number, m: number) { ... }
}

// We amend prototype just as a way to escape typescript type inference.
// In a real-life scenario, the Clock class might be defined in a JavaScript project
// with manually written (and thus incorrect) declaration files.
Clock.prototype.currentHour = function() {
  return this.h;
}

let c = new Clock(10, 10);

// c.currentHour() will NOT be allowed

interface ClockInterface {
  currentHour(): number;
}

// c.currentHour() will be allowed
```

It is worth noting that classes translate to interfaces, therefore this is also perfectly correct as well:

```typescript
let c = new Clock(10, 10);

// c.currentHour() will NOT be allowed

interface Clock { // amending directly the Clock class (interface)
  currentHour(): number;
}

// c.currentHour() will be allowed
```

Similarly, if the Clock class is in a external module, one can amend the interfaces by wrapping the typing
in a `declare module 'package-name/or/path/to/module' { ... }` block e.g.

```typescript
// ./clock.ts
export class Clock {...}

// ./index.ts
import {Clock} from './clock';

declare module './clock' {
  interface Clock {
    currentHour(): number;
  }
}

let c = new Clock(10, 10);
// c.currentHour() will be allowed
```


## `interface` vs `type`

Historically `type` was inferior to `interface`, but that is not the case today, although differences still exist.

**The simple recommendation is to use `interface`, unless you cannot and you need `type`.**

A clear-cut comparison, from https://pawelgrzybek.com/typescript-interface-vs-type/, is that:
* `interface` cannot type a primitive
* `interface` declarations can be merged (amended), but `type` doesn't allow that
* `type` declarations can use computed properties
* `type` declarations are resolved eagerly


`type` is for type aliases,
either trivial ones like `type Seconds = number;` which add visual semantics to the type,
or advanced ones to increase readability e.g. in a function signature.

Type aliases will never transcend to the compiler, they act like inline replacements.
So `let s: Seconds;` will be treated simply as `let s: number;`, and the compiler (and intellisense) will show you `s: number`.

Advanced types will be a mix of:
* intersection types e.g. `{a: boolean} & {b: boolean}` means that all the type constraints need to be fulfilled
* union types e.g. `{a: boolean} | {b: boolean}` means that only one of the type constraints needs to be fulfilled
* conditional types e.g. `T extends U ? X : Y` means that type is X or Y depending on whether T extends U
* mapped types (with generics) e.g. `NonNullable<T> = T extends null | undefined ? never : T` means the type is T, but not null or undefined.

[Read more about advanced types.](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

Both types and interfaces can be for object types .e.g.

``` typescript
interface SomeObject {
  someProp: boolean;
}
```

of function types e.g.

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source, subString) { // types will be inferred
  let result = source.search(subString);
  return result > -1;
}
```

or overloaded function types e.g.

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
  (source: object, subString: string): boolean;
}
```

or constructor types e.g.

```typescript
interface SearchConstructor {
  new (source: string, subString: string);
}

class Search implements SearchConstructor {
  constructor(source: string, subString: string) { ... }
}
```

or for indexable types (arrays, objects, etc) e.g.

```typescript
interface StringArray {
  [index: number]: string;
}
```

or for class types e.g.

```typescript
interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date = new Date();
    constructor(h: number, m: number) { ... }
}
```

or for hybrid types e.g.

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
  cache: Map;
}
```

[Read more about interfaces.](https://www.typescriptlang.org/docs/handbook/interfaces.html)


## References

* https://mariusschulz.com/blog/series/typescript-evolution
* https://www.typescriptlang.org/docs/handbook/basic-types.html
* https://microsoft.github.io/TypeScript-New-Handbook/outline/
