'use strict';

const db = require('./queryBuilder');

const pg = db.open({
  host: '127.0.0.1',
  port: 5432,
  database: 'application',
  user: 'taras',
  password: '030922',
});

console.dir({ pg });

pg.select('pg_tables')
  .where({ tableowner: 'taras', schemaname: 'public' })
  .fields(['schemaname', 'tablename', 'tableowner', 'hasindexes'])
  .order('tablename')
  .then((rows) => {
    console.table(rows);
    pg.close();
  });
