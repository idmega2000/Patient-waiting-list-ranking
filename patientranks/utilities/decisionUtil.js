const { uniqueRandom, getOrReturnMax, getDistanceInKm } = require('./utils');

/**
 * @description - method to get the statistical data
 * @param {Array} data - the patient data 
 * @param {number} fascilityLongitude - the fascility latitude
 * @param {number} fascilityLatitude - the fascility longitude
 * @returns {object} object of the stats
 */
function getStatData(data, fascilityLongitude, fascilityLatitude) {

    let maxAcceptedOffer = 0,
        maxCancelledOffer = 0, 
        maxAverageReplyTime = 0,
        maxAverageDistance = 0,
        totalOffer = 0;

    const dataWithDistance = data.map((patient) => {

        const distanceInKm = getDistanceInKm(patient.location, fascilityLongitude, fascilityLatitude);

        maxAcceptedOffer = getOrReturnMax(patient.acceptedOffers, maxAcceptedOffer);
        maxCancelledOffer = getOrReturnMax(patient.canceledOffers, maxCancelledOffer);
        maxAverageReplyTime = getOrReturnMax(patient.averageReplyTime, maxAverageReplyTime);
        maxAverageDistance = getOrReturnMax(distanceInKm, maxAverageDistance);

        totalOffer += (patient.acceptedOffers + patient.canceledOffers);
        patient.location.distanceInKm = distanceInKm
        return patient;
    });

    const meanOffer = totalOffer / (2 * data.length);
    return { dataWithDistance, maxAcceptedOffer, maxCancelledOffer, maxAverageReplyTime, maxAverageDistance, meanOffer };
}


/**
 * @description - method to generate little to no behavioral data to be added to the list of patient returned
 * @param {Array} data - the patient data 
 * @param {number} meanOffer - the mean off all offers
 * @param {number} numberOfTrueRank - the number of patiet with rank that will be returned
 * @returns {Array} object of the stats
 */
function getLittleOrNoBehavioralUsers(data, meanOffer, numberOfTrueRank) {
    const littleBehaviorUser = [];
    for (let i = numberOfTrueRank; i < data.length; i++) {
        if (data[i].acceptedOffers < meanOffer && data[i].canceledOffers < meanOffer) {
            littleBehaviorUser.push(data[i]);
        }
    }

    return littleBehaviorUser
}


/**
 * @description - method to generate little to no behavioral data to be added to the list of patient returned
 * @param {Array} rankedList - the ranked list(ranked with score)
 * @param {Array} littleBehavioralRankedList - the list with patient with little befavioral data
 * @param {number} noOfRanked - the number of ranked data that will be returned to the user
 * @param {number} noOfLittleBehavioral - the number of the data with little behavioral data
 * @returns {Array} the data with addition of behavioral data
 */
function addLittleBehavioralToData(rankedList, littleBehavioralRankedList, noOfRanked, noOfLittleBehavioral) {

    // get random nimbers to use as positorion to  add the 
    // Here is to generate the random data without having to sort the whole data over again
    // random indexes are generated and used to select the random little behavioral patient
    const generateRandomSortedIndex = uniqueRandom(0, noOfRanked - 1, noOfLittleBehavioral);
    const generateRandomUnSortedIndex = uniqueRandom(0, littleBehavioralRankedList.length, noOfLittleBehavioral);
    generateRandomSortedIndex.forEach((indexToAddTo, index) => {
        const indexOfPatient = generateRandomUnSortedIndex[index];
        const patient = littleBehavioralRankedList[indexOfPatient];
        rankedList.splice(indexToAddTo, 0, patient);
    });
    return rankedList;

};


module.exports = { getStatData, getLittleOrNoBehavioralUsers, addLittleBehavioralToData }
