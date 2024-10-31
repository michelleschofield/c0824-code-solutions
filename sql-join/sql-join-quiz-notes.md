# sql-join-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- What is a foreign key?
  a column in one table that refers to a primary key in a different table
- How do you join two SQL tables? (Provide at least two syntaxes.)
  select "products"."name" as "product",
  "suppliers"."name" as "supplier"
  from "products"
  join "suppliers" using ("supplierId");
- How do you temporarily rename columns or tables in a SQL statement?
  "tableName"."columnName" as "customName"
- How do you create a one-to-many relationship between two tables?
  have one table that has one column pointing to a foreign key
- How do you create a many-to-many relationship between two tables?
  have a table that just has columns that connect different foreign keys

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
