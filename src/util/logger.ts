import { LoggerOptions, createLogger, transports, format } from 'winston';
import TransportStream from 'winston-transport';
import { Format } from 'logform';
import { resolve as pathResolve } from 'path';
import { isProductionEnv } from '../config/secrets';

const isProductionMode: boolean = isProductionEnv();

const consoleTransportOptions: transports.ConsoleTransportOptions = {
    level: isProductionMode ? 'error' : 'debug'
};

const maxSizeTransportOption: number = 5120000;
const maxFilesTransportOption: number = 5;
const filenNameTransportOption: string = pathResolve(__dirname, '..', '..', 'logs', 'debug.log');

const fileTransportOptions: transports.FileTransportOptions = {
    maxsize: maxSizeTransportOption,
    maxFiles: maxFilesTransportOption,
    filename: filenNameTransportOption,
    level: consoleTransportOptions.level
};

const loggerFormat: Format = format.combine(format.simple());

const consoleTransportInstance: transports.ConsoleTransportInstance = new transports.Console(consoleTransportOptions);
const fileTransportInstance: transports.FileTransportInstance = new transports.File(fileTransportOptions);

const transportStream: TransportStream[] = [
    consoleTransportInstance,
    fileTransportInstance
];

const options: LoggerOptions = {
    format: loggerFormat,
    transports: transportStream
};

const logger = createLogger(options);

if (!isProductionMode) {
    logger.debug('Logging initialized at debug level');
}

export default logger;
