# react-state-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- What are _hooks_ in React?
  hooks are special functions that allow components to have access to state and other react features
- What are the "Rules of Hooks"? (if necessary, re-read the "Pitfall" box in [State](https://react.dev/learn/state-a-components-memory))
  the function name must start with use and be followed by an uppercase letter, they can only be called by components and other hooks, they must always be at the top level of a component and in the same order
- What is the purpose of state in React?
  to allow components to remember information across rerendering
- Why can't we just maintain state in a local variable?
  because local variables are reset every time the function is called
- What two actions happen when you call a `state setter` function?
  the new value will be stored by react so it isn't lost, and the component will rerender
- When does the local `state variable` get updated with the new value?
  when the component is rerendered

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
