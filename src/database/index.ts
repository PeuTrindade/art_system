import knex from 'knex'

const connection = knex({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: 33061,
        user: 'root',
        password: '123456',
        database: 'apiarts'
    }
})

export default connection