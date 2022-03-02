import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import schemas from './schema';
import ModelUser from './model/ModelUser'

const adapter = new SQLiteAdapter({
  schema: schemas
});

const database = new Database({
  adapter,
  modelClasses: [ModelUser],
});

export default database;

