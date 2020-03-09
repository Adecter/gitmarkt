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

    async createConnection(){
        await this.client.connect()
    }

    static async create(){
        const o = new ServiceRepository()
        await o.createConnection()
        return o;
    }

    async persistService(dto) {
        const text = 'INSERT INTO \"Service\" (\"name\", \"category\", \"keywords\") VALUES($1, $2, $3)'
        return await this.client.query(text, [dto.name, dto.category, dto.keywords])
    }

    async getCategories(){
        return (await this.client.query('SELECT * FROM \"Category\"')).rows
    }
}