import Joi from 'joi';
import organiseJoiError from './organiseJoiError';

/**
 * @description validation class
 */
class PatientValidation {
  /**
     * @description - a validator method for validating creation of gateway
     * @param {*} req request object
     * @param {*} res  response object
     * @param {*} next next middleware
     * @returns {object} - validate user login credentials
     */
  static validateGetPatientRank(req, res, next) {
    const schema = Joi.object().keys({
      longitude: Joi.number().required(),
      latitude: Joi.number().required(),
      noOfRanked: Joi.number().min(5).max(25).when(
        'noOfLittleBehavioral', {
          is: Joi.exist(),
          then: Joi.required()
        }
      ),
      noOfLittleBehavioral: Joi.number().min(0).max(4),

    });

    const { error } = schema.validate(req.query, { abortEarly: false });
    if (error) {
      organiseJoiError(error);
    }
    return next();
  }
}

export default PatientValidation;
