import { Client } from 'pg'

export default class ServiceRepository {

    constructor(){}


    async persistService(dto) {

        const client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'ecom',
            password: 'qwerty',
            port: 5432,
        })

        await client.connect()

        const text = 'INSERT INTO Service (name, category, keywords) VALUES($1, $2, $3)'

        return await client.query(text, [dto.name, dto.category, dto.keywords])

    }
}