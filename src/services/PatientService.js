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
   * @returns {object} - object representing response message
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
