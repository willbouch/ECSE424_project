import * as bodyParser from 'body-parser';
import 'reflect-metadata';

import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

// declare metadata by @controller annotation
import "./controllers/ReadinessController";
import { ReadinessService } from './services/ReadinessService';

// set up container
let container = new Container();

// set up bindings
container.bind<ReadinessService>('ReadinessService').to(ReadinessService);

// create server
let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  // add body parser
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});

let app = server.build();
app.listen(3000);
app.get('/', (req, res) => {
  res.status(200).send({
    app: 'backend',
    status: 'running'
  });
});