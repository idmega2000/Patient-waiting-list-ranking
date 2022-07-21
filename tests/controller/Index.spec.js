import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import url from '../../src/index';
import { RESPONSE_MESSAGE } from 'utilities/constant';


chai.use(chaiHttp);
describe('Accessing index data', () => {
    describe('API endpoint for Home', () => {

        it('should return success when user access the api/v1 route', () => chai.request(url)
            .get('/api/v1')
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('Object');
                expect(res.body.status).to.eql('success');
                expect(res.body.message).to.eql(RESPONSE_MESSAGE.WELCOME_V1);
            }));
        it('should return success when user access the home route(/)', () => chai.request(url)
            .get('')
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('Object');
                expect(res.body.status).to.eql('success');
                expect(res.body.message).to.eql(RESPONSE_MESSAGE.WELCOME);
            }));
    });
    describe('API endpoint for not found error', () => {
        it('should return error for endpoint that does not exist', () => chai.request(url)
            .get('/api/v2/dklskdjl')
            .then((res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('Object');
                expect(res.body.status).to.eql('error');
                expect(res.body.message).to.eql('route does not exist.');
            }));
    });
});
