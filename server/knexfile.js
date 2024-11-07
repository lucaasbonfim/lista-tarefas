import { fileURLToPath } from 'url';
const currentDir = fileURLToPath(new URL('.', import.meta.url));

export default {

    development: {
        client: "pg",
        connection: {
            database: "tarefas",
            port: 5432,
            user: "postgres",
            password: "21031998"
        },
        migrations: {
            tableName: "migrations",
            directory: `${currentDir}/src/database/migrations`
        }
    }
}
