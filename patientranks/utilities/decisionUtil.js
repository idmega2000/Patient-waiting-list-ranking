const { uniqueRandom, getOrReturnMax, getDistanceInKm } = require('./utils');

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


// this is done seperatley so as to allow little to no behavioral data to be added to the list of patient returnedf
function getLittleOrNoBehavioralUsers(data, meanOffer, numberOfTrueRank) {
    const littleBehaviorUser = [];
    for (let i = numberOfTrueRank; i < data.length; i++) {
        if (data[i].acceptedOffers < meanOffer && data[i].canceledOffers < meanOffer) {
            littleBehaviorUser.push(data[i]);
        }
    }

    return littleBehaviorUser
}

function addLittleBehavioralToData(trueRankedList, littleBehavioralRankedList, noOfRanked, noOfLittleBehavioral) {

    // get random nimbers to use as positorion to  add the 
    const generateRandomSortedIndex = uniqueRandom(0, noOfRanked - 1, noOfLittleBehavioral);
    const generateRandomUnSortedIndex = uniqueRandom(0, littleBehavioralRankedList.length, noOfLittleBehavioral);

    generateRandomSortedIndex.forEach((indexToAddTo, index) => {
        const indexOfPatient = generateRandomUnSortedIndex[index];
        const patient = littleBehavioralRankedList[indexOfPatient];
        trueRankedList.splice(indexToAddTo, 0, patient);
    });
    return trueRankedList;

};


module.exports = { getStatData, getLittleOrNoBehavioralUsers, addLittleBehavioralToData }
