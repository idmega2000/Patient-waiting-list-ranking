const data = require('../../sample-data/patients.json');


/**
 *@description class will query for patient(wil be the later to the db)
 *
 * @class PatientRepositories
 */
class PatientRepositories {
  // method to get all patient
  static async findAllPatient() {
    return data;
  }
}

export default PatientRepositories;
