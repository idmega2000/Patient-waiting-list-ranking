import ServerResponses from 'utilities/ServerResponse';
import PatientService from 'services/PatientService';

/**
* @description class will implement functionalities for patient
*
* @class PatientController
*/
class PatientController {

    /**
     * @description get patient list base on behavioral and demographic data
     * @param {object} req - Request sent to the route
     * @param {object} res - Response sent from the controller
     * @param {object} next - Error handler
     * @returns {object} - object representing response message
     */
    static async getPatientByWithRank(req, res, next) {
        try {
            const { longitude, latitude, noOfRanked, noOfLittleBehavioral } = req.query;
            const patitents = await PatientService.getRankedList(longitude, latitude, noOfRanked, noOfLittleBehavioral );
            const { message, data } = patitents;
            return ServerResponses.response(res, { message, data });
        } catch (error) {
            return next(error);
        }
    }
}

export default PatientController;
