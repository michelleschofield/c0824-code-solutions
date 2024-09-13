# typescript-view-swapping-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- What is the `event.target`?
  the element that caused the event
- What is the effect of setting an element to `display: none`?
  it disappears
- What does the `element.matches()` method take as an argument and what does it return?
  it takes a selector and returns a boolean
- How can you retrieve the value of an element's attribute?
  getAttribute
- At what steps of the solution would it be helpful to log things to the console?
  all of them
- If you were to add another tab and view to your HTML, but you didn't use event delegation, how would your TypeScript code be written instead?
  I would need to give each tab it's own event listener
- If you didn't use a loop to conditionally show or hide the views in the page, how would your TypeScript code be written instead?
  I would keep track of the current tab in a variable, and need to change the class of the current variable then set the variable to the new current tab and then change the class of that one, or maybe I would just keep the index for it in the variable but same concept, then also do the same for the viewports.

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
