import knex from "knex"

const connection = knex({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'apiarts'
    }
})

export default connection