# react-effects-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- When is a component "mounted" to the DOM?
  when it is first rendered
- What is a React Effect?
  it runs on render or when the dependencies change
- When should you use an Effect and when should you not use an Effect?
  you should only use an effect if you want it to be something caused by rendering
- When do Effects run?
  on mount and whenever dependencies change or after every render if no dependencies are specified
- What function is used to declare an Effect?
  useEffect
- What are Effect dependencies and how do you declare them?
  they are the information that you want to use in your effect and you want them changing to trigger the effect and you declare them by passing an array of dependencies to the useEffect function
- Why would you want to clean up from an Effect?
  so things aren't left there that could mess up other stuff
- How do you clean up from an Effect?
  return a cleanup function
- When does the cleanup function run?
  before the effect runs again

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
