import express, { Express } from 'express';
import { AppServer } from '@root/server';
import { databaseConnection } from '@root/database';
import { config } from '@root/config';

class App {
  public init() {
    this.loadConfig();
    databaseConnection();
    const app: Express = express();
    const server: AppServer = new AppServer(app);
    server.start();
  }

  private loadConfig(): void {
    config.validateConfig();
  }
}

const app = new App();
app.init();
