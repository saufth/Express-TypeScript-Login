import { App } from './app';
import { serverPort } from './config/secrets';

const main = async (): Promise<void> => {
    const app: App = new App(serverPort);
    await app.listen();
}

main();
