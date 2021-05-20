import { Pool, PoolOptions, RowDataPacket, OkPacket, ResultSetHeader, FieldPacket } from 'mysql2/promise';

export type MySQLConnection = Pool;
export type MySQLResult = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];
