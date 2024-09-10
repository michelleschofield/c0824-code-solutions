# dom-query-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- Why do we log things to the console?
  to get a better understanding of what is happening in the code
- What is a "model"?
  a representation of the html document
- Which "document" is being referred to in the phrase Document Object Model?
  html document
- What is the word "object" referring to in the phrase Document Object Model?
  nodes and objects
- What is a DOM Tree?
  each element is a node in a tree
- Give two examples of `document` methods that retrieve a single element from the DOM.
  querySelector, getElementById
- Give one example of a `document` method that retrieves multiple elements from the DOM at once.
  querySelectorAll
- Why might you want to assign the return value of a DOM query to a variable?
  because querying the dom takes a long time, so if you store it in a variable you can access it without querying again
- What `console` method allows you to inspect the properties of a DOM element object?
  console.dir()
- Why would a `<script>` tag need to be placed at the bottom of the HTML content instead of at the top?
  the browser needs to parse all the elements before javascript can access them
- What does `document.querySelector()` take as its argument and what does it return?
  it takes a selector as an argument and returns the first matching element
- What does `document.querySelectorAll()` take as its argument and what does it return?
  it takes a selector as an argument and returns every matching element

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
