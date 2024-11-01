# express-postgres-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- What is the purpose of the `pg` NPM package?
  for node and postgres to work together
- How do you tell `pg` which database to connect to?
  you give it the path
- How do you send SQL to PostgreSQL from your Express server?
  .query() method
- How do you access the rows that get returned from the SQL query?
  result.rows
- What must you always remember to put around your asynchronous route handlers? Why?
  a try catch because if an error propagates out express will crash
- What is a SQL Injection Attack and how do you avoid it in `pg`?
  it's when someone puts evil sql in the url then you put it the sql to send to the db, you avoid with parameterized queries $N

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
