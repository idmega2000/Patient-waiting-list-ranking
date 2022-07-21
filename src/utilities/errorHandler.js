import APIException from './APIException';
import { ERROR_NAMES, RESPONSE_MESSAGE } from 'utilities/constant';
import logger from './logger';
import ServerResponse from 'utilities/ServerResponse';

/**
 * @description the app ues a general global exception handler
 * @param {object} err - response body
 * @param {object} req - request body
 * @param {object} res - response body
 * @param {object} next - the error object
 * @returns {Error} - object representing response response
 */
export const generalErrorHandler = (err, req, res, next) => {
  const {
    name, errors, dateTime = new Date(), status = 'error'
  } = err;
  let { message, statusCode, } = err;

  switch (name) {
  case (ERROR_NAMES.VALIDATION_ERROR):
    statusCode = 400;
    break;

  case (ERROR_NAMES.NOT_FOUND):
    // handle invalid json
    statusCode = 404;
    message = RESPONSE_MESSAGE.NOT_FOUND;
    break;

  case (ERROR_NAMES.UNAUTHORIZED):
    // handle unauthorized json
    statusCode = 401;
    break;

  default:
    // server errors
    statusCode = 500;
    message = RESPONSE_MESSAGE.SOMETHING_WENT_WRONT;
  }

  logger.error(err);
  return ServerResponse.response(res, {
    message, errors, dateTime, status
  }, statusCode);
};

/**
     * @description handle reoute not found
     * @param {object} req - request body
     * @param {object} res - response body
     * @param {object} next - the error object
     * @returns {Error} - object representing response response
     */
export const notFoundHander = (req, res, next) => {
  const err = new APIException(RESPONSE_MESSAGE.NOT_FOUND, 404, 'error', ERROR_NAMES.NOT_FOUND);
  err.statusCode = 404;
  next(err);
};
