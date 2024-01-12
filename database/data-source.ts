import { DataSource, DataSourceOptions } from "typeorm";

const appDataSource = new DataSource({
    type: 'postgres',
    host: "localhost",
    port: 5432,
    database: "close-t",
    username: "close-t",
    password: "close-t",
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    uuidExtension: 'uuid-ossp',  
} as DataSourceOptions);

export default appDataSource;