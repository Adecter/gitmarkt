import * as pg from 'pg'

export default class ServiceRepository {

    constructor(){
        this.client = new pg.default.Client({
            user: 'postgres',
            host: 'localhost',
            database: 'ecom',
            password: 'qwerty',
            port: 5432,
        })
    }


    async persistService(dto) {
        //TODO: Do i need to close connection?
        await this.client.connect()
        const text = 'INSERT INTO \"Service\" (\"name\", \"category\", \"keywords\") VALUES($1, $2, $3)'
        return await this.client.query(text, [dto.name, dto.category, dto.keywords])
    }

    async getCategories(){
        await this.client.connect()
        return (await this.client.query('SELECT * FROM \"Category\"')).rows
    }
}