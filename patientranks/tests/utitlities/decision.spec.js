let { expect } = require('chai');
let { getStatData } = require('../../utilities/decisionUtil');

let generatePatient = require('../mock/patient');

describe('Patient Ranking', () => {
    const patientMock = generatePatient(400);
    describe('get ranked data', function () {
        it('should return the stat data with maxAcceptedOffer greater than 0', function () {
            const statData = getStatData(patientMock, -63.1150, 46.7110,);
            expect(statData.maxAcceptedOffer).to.be.greaterThan(1);
        });
    });
});