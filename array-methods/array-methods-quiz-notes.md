# array-filter-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- `Array.forEach`:

  - What does `Array.forEach` do?
    it runs a callback function passing it the element, it's index, and the original array, for each element in the array
  - What should the callback function do?
    execute some code using the element it got passed?
  - What is `Array.forEach` useful for?
    when you need to execute some code for each value in an array

- `Array.map`:

  - What does `Array.map` do?
    it returns a new array populated with the results of calling a callback function for each element in the array
  - What should the callback function return?
    the element you want to go in the array
  - What is `Array.map` useful for?
    making a new array that is a changed version of an array

- `Array.find`:

  - What does `Array.find` do?
    it executes a callback function on each element until the callback returns a truthy value then it returns the value of the element that the callback returned a truthy value on
  - What should the callback function return?
    a truthy value for the element you want to find and a falsy value for all the other elements
  - What is `Array.find` useful for?
    when you want to find an element that meets a condition in an array

- `Array.filter`:
  - What does `Array.filter` do?
    creates a new array with all element that return a truthy value when passed to the callback function
  - What should the callback function return?
    a truthy value for the ones you want and a falsy value for the elements you don't want
  - What is `Array.filter` useful for?
    when you want a copy of an array that only contains the elements that meet a certain condition

## Notes

All student notes should be written here.

How to write `Code Examples` in markdown

for JS:

```javascript
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
