import express from 'express';
import { ClientError, errorMiddleware } from './lib/index.js';
import pg from 'pg';

const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/pagila',
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

app.get('/api/actors', async (req, res, next) => {
  try {
    const sql = `
      select
        "actorId",
        "firstName",
        "lastName"
      from "actors";
    `;
    const result = await db.query(sql);
    const actors = result.rows;
    res.send(actors);
  } catch (err) {
    next(err);
  }
});

app.get('/api/films', async (req, res, next) => {
  try {
    const sql = `
    select "title",
           "filmId"
      from "films"
      order by "replacementCost" desc;
    `;
    const result = await db.query(sql);
    const films = result.rows;
    res.send(films);
  } catch (err) {
    next(err);
  }
});

app.get('/api/film', async (req, res, next) => {
  try {
    const { filmId } = req.query;
    if (!filmId) throw new ClientError(400, 'filmId is required');
    const sql = `
    select *
    from "films"
    where "filmId" = $1;
    `;

    const params = [filmId];
    const result = await db.query(sql, params);
    const film = result.rows[0];
    if (!film) throw new ClientError(404, `film ${filmId} not found`);

    res.send(film);
  } catch (err) {
    next(err);
  }
});

app.put('/api/film', async (req, res, next) => {
  try {
    const { title, filmId } = req.query;

    if (!filmId) throw new ClientError(400, 'filmId is required');
    if (!title) throw new ClientError(400, 'title is required');

    const sql = `
    update "films"
      set "title" = $1
      where "filmId" = $2
      returning *;
    `;
    const params = [title, filmId];
    const result = await db.query(sql, params);
    const updated = result.rows[0];

    if (!updated) throw new ClientError(404, `film ${filmId} not found`);
    res.send(updated);
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(8080, () => {
  console.log('listening on port 8080');
});
