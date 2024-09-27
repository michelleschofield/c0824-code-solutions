# typescript-async-await-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- What are the `async` and `await` keywords used for?
  for running asynchronous functions and having code that executes once they are fulfilled
- How do `async` and `await` differ from `Promise.then` and `Promise.catch`?
  Easier to write and read
- When do you use `async`?
  when something won't happen instantly it will take some time
- When do you use `await`? When do you _not_ use `await`? (What happens if you `await` a synchronous function?)
  you use for async functions and you don't use it for synchronous functions I don't know what happens when you use it for synchronous though
- How do you handle errors with `await`?
  with catch
- What do `try`, `catch` and `throw` do? When do you use them?
  you use them for async stuff, try will run something and if it has an error catch will take over and throw will throw the error
- What happens if you forget to use `await` on a Promise? In that case, what happens to the Promise rejection?
  the exception will bubble
- Which style of asynchronous programming do you prefer — callbacks, `Promise.then`, or `async/await`? Why?
  callbacks because my brain understands it

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
