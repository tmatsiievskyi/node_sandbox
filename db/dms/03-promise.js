'use strict';

const { Pool } = require('pg');

const pool = new Pool({
  host: '127.0.0.1',
  port: 5432,
  database: 'application',
  user: 'taras',
  password: '030922',
});

const fields = ['schemaname', 'tablename', 'tableowner', 'hasindexes'];
const sql =
  'SELECT ' +
  fields.join(', ') +
  ' FROM pg_catalog.pg_tables WHERE tableowner = $1';
pool
  .query(sql, ['taras'])
  .then((res) => {
    const { rows } = res;
    console.table(rows);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    pool.end();
  });
