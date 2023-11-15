import { Application, json, urlencoded, Request, Response, NextFunction } from 'express';
import { createServer, Server as HttpServer } from 'http';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { Server as SocketServer } from 'socket.io';
import compression from 'compression';
import 'express-async-errors';
import { config } from '@root/config';
import appRoutes from '@root/routes';
import { CustomError, IErrorResponse } from '@global/helpers/error-handler';
import { Log } from '@global/helpers/Logger';
import {DeliverySocketHandler} from "@root/shared/sockets/delivery.socket";

const SERVER_PORT = config.PORT;
export class AppServer {
  private readonly app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }

  private securityMiddleware(app: Application): void {
    app.set('trust proxy', 1);
    app.use(cookieParser([config.SECRET_KEY_ONE, config.SECRET_KEY_TWO]));
    app.use(helmet());
    app.use(
      cors({
        credentials: true,
        origin: config.CLIENT_URL,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
  }
  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(morgan('dev'));
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
  }
  private routesMiddleware(app: Application): void {
    appRoutes(app);
  }
  private globalErrorHandler(app: Application): void {
    /*app.all('*', (req: Request, res: Response) => {
      res.status(StatusCodes.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
    });*/

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((error: IErrorResponse, _req: Request, res: Response, _: NextFunction) => {
      if (error instanceof CustomError) {
        Log.error(error);
        return res.status(error.statusCode).json(error.serializeErrors());
      }
      Log.error(error);
      return res.status(500).json({ error: 'unexpected error' });
    });
  }
  private startServer(app: Application): void {
    if (!config.JWT_TOKEN) {
      throw new Error('JWT_TOKEN must be provided');
    }
    try {
      const httpServer: HttpServer = createServer(app);
      this.startHttpServer(httpServer);
      const socketIO: SocketServer = this.createSocketIO(httpServer);
      this.socketIOConnections(socketIO);
    } catch (e) {
      Log.error(e);
    }
  }

  private createSocketIO(httpServer: HttpServer): SocketServer {
    const io: SocketServer = new SocketServer(httpServer, {
      transports: ['websocket'],
      cors: {
        origin: config.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      }
    });
    return io;
  }


  private socketIOConnections(io: SocketServer): void {
    const socketIoDeliveryHandler: DeliverySocketHandler = new DeliverySocketHandler(io);
    socketIoDeliveryHandler.listen();
  }
  private startHttpServer(httpServer: HttpServer): void {
    httpServer.listen(SERVER_PORT, () => {
      Log.info(`Server listen on port ${SERVER_PORT}`);
    });
  }
}
