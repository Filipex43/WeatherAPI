import { DataSourceOptions } from "typeorm";

export const config: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'weatherapi',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
}