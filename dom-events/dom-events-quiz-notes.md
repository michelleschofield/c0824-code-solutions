# dom-events-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- Why do we log things to the console?
  to get an understanding of what's happening in the code
- What is the purpose of events and event handling?
  to interact with the user using javascript
- Are all possible parameters required to use a JavaScript method or function?
  no
- What method of element objects lets you set up a function to be called when a specific type of event occurs?
  addEventListener
- What is a callback function?
  a function that is passed to the addEventListener function
- What object is passed into an event listener callback when the event fires?
  the event object
- What is the `event.target`? If you weren't sure, how would you check? Where could you get more information about it?
  it's the element that triggered the event, you could check using the log method of the console object
- What is the difference between these two snippets of code?
  ```js
  element.addEventListener('click', handleClick);
  ```
  ```js
  element.addEventListener('click', handleClick());
  ```
  the first one is being passed the function itself as an argument, the second one is passed the result from calling the function

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
