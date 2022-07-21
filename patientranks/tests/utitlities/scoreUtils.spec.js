let { expect } = require('chai');
let { AGE_BRACKET } = require('../../utilities/constants');
let { getAgeScore } = require('../../utilities/scoreUtil');
let getRankedListData = require('../../index');

let generatePatient =  require('../mock/patient');

describe('Score Utility', () => {
    const patientMock = generatePatient(400);
    const location = { latitude: 46.7110, longitude: -63.1150 };
    describe('get ranked data', function () {
        it('should return the right age score on the passed age', function () {
            const age = 41;
            const ageScore = getAgeScore(age);
            const ageResp = AGE_BRACKET.find((bracket) => bracket.from <= age && bracket.to >= age);
            expect(ageScore).to.eq(ageResp.score);
        });
        it('should return the right data when numberOfTrueRank and noOfLittleBehavioral is passed ', function () {
            const rankedList = getRankedListData(patientMock, location, 10, 2);
            expect(rankedList).to.have.lengthOf(12);
        });
    });
});