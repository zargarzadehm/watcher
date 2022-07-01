import path from 'path';
import { DataSource } from "typeorm";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ergoOrmConfig = new DataSource({
    type: "sqlite",
    database: __dirname + "/../sqlite/ergoWatcher.sqlite",
    entities: ['src/entities/watcher/cardano/*.ts'],
    migrations: ['src/migrations/watcher/cardano/*.ts'],
    synchronize: false,
    logging: false,
});
