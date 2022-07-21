let { expect } = require('chai');
let getRankedListData = require('../../index');

let generatePatient = require('../mock/patient');

describe('Patient Ranking', () => {
    const location = { latitude: 46.7110, longitude: -63.1150 };
    const patientMock = generatePatient(400);
    describe('get ranked data', function () {
        it('should return all data is numberOrRank and numberOfLilbehavior is not passed', function () {
            const rankedList = getRankedListData(patientMock, location);
            expect(rankedList).to.have.lengthOf(400);
        });
        it('should return the right data when numberOfTrueRank and noOfLittleBehavioral is passed ', function () {
            const rankedList = getRankedListData(patientMock, location, 10, 2);
            expect(rankedList).to.have.lengthOf(12);
        });
    });
});