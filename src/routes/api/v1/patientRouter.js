import PatientController from 'controllers/PatientController';
import { Router } from 'express';
import PatientValidation from 'middleware/PatientValidation';

const patientRouter = Router();


/**
 * @description - route to get the patients with their acceptance rank
 */
patientRouter.get('', 
  PatientValidation.validateGetPatientRank,
  PatientController.getPatientByWithRank);

export default patientRouter;