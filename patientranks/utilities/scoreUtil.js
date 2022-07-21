const { AGE_BRACKET } = require('./constants');


function getAgeScore(age) {
    // percentage scores
    const ageBracket = AGE_BRACKET.find((bracket) => bracket.from <= age && bracket.to >= age);
    return ageBracket.score;
};

const calculateScore = (patient, statData) => {
    const { maxAcceptedOffer, maxCancelledOffer, maxAverageReplyTime,
        maxAverageDistance } = statData;

    // percentage scores
    const acceptanceScore = (patient.acceptedOffers * 30) / maxAcceptedOffer;
    const ageScore = getAgeScore(patient.age);
    const cancelationScore = 30 - (((patient.canceledOffers * 30) / maxCancelledOffer));
    const distanceScore = 10 - (((patient.location.distanceInKm * 10) / maxAverageDistance));
    const averageReplyTimeScore = 20 - (patient.averageReplyTime * 20) / maxAverageReplyTime;
    return acceptanceScore + ageScore + cancelationScore + distanceScore + averageReplyTimeScore;
};


function getSortedDataWithScore(patientData, statData) {
    return patientData.map((patient) => {
        const score = calculateScore(patient, statData);
        // get the distance
        return {
            ...patient,
            score: score.toFixed(2),
        };
    }).sort((a, b) => b.score - a.score)
}

module.exports = { getSortedDataWithScore, getAgeScore }