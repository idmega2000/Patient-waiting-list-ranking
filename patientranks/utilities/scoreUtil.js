const { AGE_BRACKET } = require('./constants');


/**
 * @description - method to get age score
 * @param {number} age - the age of the patient
 * @returns {number} the constant percentage for that age
 */
function getAgeScore(age) {
    // percentage scores
    const ageBracket = AGE_BRACKET.find((bracket) => bracket.from <= age && bracket.to >= age);
    return ageBracket.score;
};

/**
 * @description - method to calculate patient score
 * @param {object} patient - the patient
 * @param {object} statData - the stat data for the data set
 * @returns {number} the constant percentage for that age
 */
const calculateScore = (patient, statData) => {
    const { maxAcceptedOffer, maxCancelledOffer, maxAverageReplyTime,
        maxAverageDistance } = statData;

    // percentage scores with combination of negative and positive behavioral set
    const acceptanceScore = (patient.acceptedOffers * 30) / maxAcceptedOffer;
    const ageScore = getAgeScore(patient.age);
    const cancelationScore = 30 - (((patient.canceledOffers * 30) / maxCancelledOffer));
    const distanceScore = 10 - (((patient.location.distanceInKm * 10) / maxAverageDistance));
    const averageReplyTimeScore = 20 - (patient.averageReplyTime * 20) / maxAverageReplyTime;
    return acceptanceScore + ageScore + cancelationScore + distanceScore + averageReplyTimeScore;
};


/**
 * @description - method to add score to data
 * @param {Array} patientData - the patient set
 * @param {object} statData - the stat data for the data set
 * @returns {Array} the sorted data in order of their ranks
 */
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