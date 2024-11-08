import { fileURLToPath } from 'url';
const currentDir = fileURLToPath(new URL('.', import.meta.url));

export default {

    development: {
        client: "pg",
        connection:"postgresql://tarefas_owner:mUVTXy1r9Cvw@ep-rough-resonance-a5pwtrlc.us-east-2.aws.neon.tech/tarefas?sslmode=require",
        migrations: {
            tableName: "migrations",
            directory: `${currentDir}/src/database/migrations`
        }
    }
}
