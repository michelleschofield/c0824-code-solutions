import express from 'express';
import pg from 'pg';
import { ClientError, errorMiddleware } from './lib/index.js';

const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/studentGradeTable',
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

app.use(express.json());

app.get('/api/grades', async (req, res, next) => {
  try {
    const sql = `
      select *
      from "grades"
    `;
    const result = await db.query(sql);
    const grades = result.rows;
    res.status(200).json(grades);
  } catch (err) {
    next(err);
  }
});

app.get('/api/grades/:gradeId', async (req, res, next) => {
  try {
    const { gradeId } = req.params;
    if (!Number.isInteger(+gradeId)) {
      throw new ClientError(400, `${gradeId} is not an integer`);
    }
    const sql = `
      select *
      from "grades"
      where "gradeId" = $1;
    `;
    const result = await db.query(sql, [gradeId]);
    const grade = result.rows[0];
    if (!grade) throw new ClientError(404, `grade ${gradeId} not found`);
    res.status(200).json(grade);
  } catch (err) {
    next(err);
  }
});

app.post('/api/grades', async (req, res, next) => {
  try {
    const { name, course, score } = req.body;
    if (!name) throw new ClientError(400, 'name is required');
    if (!course) throw new ClientError(400, 'course is required');
    if (!score) throw new ClientError(400, 'score is required');
    if (!isValidScore(score)) {
      throw new ClientError(400, `${score} is not a valid score`);
    }

    const sql = `
      insert into "grades" ("name", "course", "score")
      values ($1, $2, $3)
      returning *;
    `;

    const result = await db.query(sql, [name, course, score]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(8080, () => {
  console.log('listening on port 8080');
});

function isValidScore(score: unknown): boolean {
  if (typeof score !== 'number') return false;
  if (!Number.isInteger(score)) return false;
  if (score < 0) return false;
  if (score > 100) return false;

  return true;
}
