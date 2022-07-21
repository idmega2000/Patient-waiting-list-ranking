import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import url from '../../src/index';

import PatientRepositories from 'repositories/PatientRepositories';
import PatientController from 'controllers/PatientController';
import { RESPONSE_MESSAGE } from 'utilities/constant';
import generatePatient from '../mock/patient';

chai.use(chaiHttp);
describe('API endpoint for Patients', () => {

    describe('API endpoint for Getting ranked patients', () => {
        beforeEach(async () => {
            sinon.stub(PatientRepositories, 'findAllPatient').returns(generatePatient(400));
        });
        afterEach(() => {
            sinon.restore();
        });
        it('retruns error when location information is not passed',
            () => chai.request(url)
                .get('/api/v1/patients')
                .then((res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('Object');
                    expect(res.body.status).to.eq('error');
                    expect(res.body.message).to.eq(RESPONSE_MESSAGE.VALIDATION_ERROR);
                }));
        it('retruns error when latitude is not passed',
            () => chai.request(url)
                .get('/api/v1/patients?longitude=-63.1150')
                .then((res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('Object');
                    expect(res.body.status).to.eq('error');
                    expect(res.body.message).to.eq(RESPONSE_MESSAGE.VALIDATION_ERROR);
                }));
        it('retruns error when longitude is not passed',
            () => chai.request(url)
                .get('/api/v1/patients?latitude=46.7110')
                .then((res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('Object');
                    expect(res.body.status).to.eq('error');
                    expect(res.body.message).to.eq(RESPONSE_MESSAGE.VALIDATION_ERROR);
                }));
        it('retruns error when noOfLittleBehavioral is passed without noOfRanked',
            () => chai.request(url)
                .get('/api/v1/patients')
                .then((res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('Object');
                    expect(res.body.status).to.eq('error');
                    expect(res.body.message).to.eq(RESPONSE_MESSAGE.VALIDATION_ERROR);
                }));
        it('retruns error when noOfLittleBehavioral is greater than 4',
            () => chai.request(url)
                .get('/api/v1/patients?longitude=-63.1150&latitude=46.7110&noOfRanked=7&noOfLittleBehavioral=8')
                .then((res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('Object');
                    expect(res.body.status).to.eq('error');
                    expect(res.body.message).to.eq(RESPONSE_MESSAGE.VALIDATION_ERROR);
                }));
        it('retruns error when noOfRanked is greater than 25',
            () => chai.request(url)
                .get('/api/v1/patients?longitude=-63.1150&latitude=46.7110&noOfRanked=30&noOfLittleBehavioral=2')
                .then((res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('Object');
                    expect(res.body.status).to.eq('error');
                    expect(res.body.message).to.eq(RESPONSE_MESSAGE.VALIDATION_ERROR);
                }));
        it('retruns success when patients are gotten successfully',
            () => chai.request(url)
                .get('/api/v1/patients?longitude=-63.1150&latitude=46.7110&noOfRanked=7&noOfLittleBehavioral=3')
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('Object');
                    expect(res.body.status).to.eq('success');
                    expect(res.body.message).to.eq(RESPONSE_MESSAGE.SUCCESSFUL);
                }));
        it('retruns success when patients are gotten successfully',
            () => chai.request(url)
                .get('/api/v1/patients?longitude=-63.1150&latitude=46.7110')
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('Object');
                    expect(res.body.status).to.eq('success');
                    expect(res.body.message).to.eq(RESPONSE_MESSAGE.SUCCESSFUL);
                }));
        it('should throw 500 error if there is server error', async () => {
            sinon.restore();
            const req = {};
            const res = {};
            const next = sinon.stub();
            sinon.stub(PatientRepositories, 'findAllPatient').throws();
            await PatientController.getPatientByWithRank(req, res, next);
            expect(next.called).to.be.true;
        });
    });
});