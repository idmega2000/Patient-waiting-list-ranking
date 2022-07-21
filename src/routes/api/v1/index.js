import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { RESPONSE_MESSAGE } from 'utilities/constant';
import ServerResponse from 'utilities/ServerResponse';
import swaggerConfig from '../../../../docs/config/swaggerConfig';
import patientRouter from './patientRouter';


const { NODE_ENV } = process.env;
const v1Router = Router();

v1Router.get('', (req, res) => ServerResponse.response(
  res, { status: 'success', message: RESPONSE_MESSAGE.WELCOME_V1 },
  200,
));

v1Router.use('/patients', patientRouter);
NODE_ENV !== 'production' ? v1Router.use('/docs',
  swaggerUi.serve, swaggerUi.setup(swaggerConfig)) : null;

export default v1Router;
