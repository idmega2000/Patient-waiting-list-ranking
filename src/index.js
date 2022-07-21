import express from 'express';
import EnvData from 'configs/EnvData';
import routes from 'routes';
import { generalErrorHandler, 
    notFoundHander } from 'utilities/errorHandler';


const app = express();

app.use(express.urlencoded({
  extended: false,
}));

app.use(express.json({
  limit: EnvData.MAX_FILE_SIZE
}));

app.use(routes);
app.use(notFoundHander);
app.use(generalErrorHandler);

app.listen(EnvData.PORT, () => console.log(`App Listening on port ${EnvData.PORT}`));
export default app;
