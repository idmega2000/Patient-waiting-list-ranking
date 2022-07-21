import { Router } from 'express';
import ServerResponse from 'utilities/ServerResponse';
import { APP_VERSIONS, RESPONSE_MESSAGE } from 'utilities/constant';

import v1Router from './api/v1';

const HOME = '/';

const router = Router();

router.get(HOME, (req, res) => ServerResponse.response(
  res, { status: 'success', message: RESPONSE_MESSAGE.WELCOME },
  200,
));

router.use(APP_VERSIONS.V1, v1Router);

export default router;