const data = require('../../sample-data/patients.json');


/**
 *@description class will query for patient
 *
 * @class PatientRepositories
 */
class PatientRepositories {
  static async findAllPatient() {
    return data;
  }
}

export default PatientRepositories;
