# typescript-operators-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- What are the `&&` (logical AND) and `||` (logical OR) operators and how can they be used outside of `if` statements?
  outside of if statements && will only evaluate the expression on the right if the one on the left is truthy, while || does the opposite and only evaluates the expression on the right if the expression on the left is falsy
- What is "short-circuit evaluation" and how does it apply to `&&` and `||`?
  short circuit evaluation means it stops evaluating if the condition it's looking for is met. && stops evaluating and returns when one of them evaluates to false, and || stops evaluating and returns when one of them evaluates to true.
- What is the `??` (nullish coalescing) operator and how does it differ from `||`?
  it only does the second one if the first one is null or undefined, and it's different from || because it only returns the second one if the first one is nullish not falsy, like how 0 is falsy but not nullish
- What is the `?:` (ternary) operator? How does it differ from `if/else`?
  there is a conditional statement before the question mark, then after the question mark is two values separated by a colon, it returns the first one if the conditional statement is truthy and returns the second one if it is falsy
- What is the `?.` (optional chaining) operator? When would you use it?
  it returns undefined if the property is null or undefined or it returns the property. You would use it when you don't know if an object has a certain property
- What is `...` (spread) syntax? How do you use it with arrays and objects?
  you have the ... then the name of the array or object you want to spread and will put each of the elements from the array or each key value pair from the object into the new array or object
- What data types can be spread into an array? Into an object?
  you can spread strings or arrays in to array and objects into objects
- How does spread syntax differ from rest syntax?
  the difference is the context in which it is used

## Notes

All student notes should be written here.

How to write `Code Examples` in markdown

for JS:

```js
const data = 'Howdy';
```

for HTML:

```html
<div>
  <p>This is text content</p>
</div>
```

for CSS:

```css
div {
  width: 100%;
}
```
