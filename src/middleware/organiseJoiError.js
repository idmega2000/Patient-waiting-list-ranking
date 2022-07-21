import { ERROR_NAMES, RESPONSE_MESSAGE, STATUS_CODES } from 'utilities/constant';
import APIException from 'utilities/APIException';

/**
 * @description - a validator method for reorganising the errors
 * @param {Object} errors - all the errors
 * @returns {Object} - returns all the formated errors
 */
const organiseJoiError = (errors) => {
  const allErrorObject = {};
  // eslint-disable-next-line no-return-assign
  errors.details.map((errorObject) => allErrorObject[errorObject.path[0]] = errorObject.message);
  throw new APIException(RESPONSE_MESSAGE.VALIDATION_ERROR, STATUS_CODES.BAD_REQUEST,
    'error', ERROR_NAMES.VALIDATION_ERROR, allErrorObject);
};

export default organiseJoiError;
