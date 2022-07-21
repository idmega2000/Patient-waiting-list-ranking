import PatientRepositories from 'repositories/PatientRepositories';
import { RESPONSE_MESSAGE } from 'utilities/constant';
const getRankedListData = require('../../patientranks/index');

/**
* @description class will implement functionalities for patient data query
*
* @class PatientService
*/
class PatientService {

  /**
   * @description - method to get ranked patient
   * @param {number} - longitude the longitude of the fascility
   * @param {number} - latitude the latitude of the fascility
   * @param {number} - noOfRankedList the number of ranked list to return
   * @param {number} - noOfLittleBehavioralList the number of extra less behavioral data to add
   * @returns {object} - object representing response information
   */
  static async getRankedList(longitude, latitude, noOfRankedList = 8, noOfLittleBehavioralList = 2) {
    // fetch the data from the data list
    const patientData = await PatientRepositories.findAllPatient();
    const fascilityLocation = { longitude, latitude };
    const data = getRankedListData(patientData, fascilityLocation, Number(noOfRankedList),
      Number(noOfLittleBehavioralList));
    return { message: RESPONSE_MESSAGE.SUCCESSFUL, data: { contents: data } };
  }

}

export default PatientService;
