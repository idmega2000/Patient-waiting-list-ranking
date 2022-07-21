

const { getLittleOrNoBehavioralUsers, addLittleBehavioralToData, getStatData } = require('./utilities/decisionUtil')
const { getSortedDataWithScore } = require('./utilities/scoreUtil')


/**
 * @description - method to get list of patient base on chances of patient accepting offer
 * @param {Array} patientData - the patient data 
 * @param {object} location - object containing longitude and latitude value
 * @param {number} numberOfTrueRank - number of patient to be returned
 * @param {number} noOfLittleBehavioral - number of little or non behavioral patient to add
 */
function getRankedListData(patientData, fascilityLocation, numberOfTrueRank, noOfLittleBehavioral) {

    const { latitude, longitude} = fascilityLocation;

    const {dataWithDistance, maxAcceptedOffer, maxCancelledOffer, maxAverageReplyTime, maxAverageDistance, meanOffer } = getStatData(patientData, longitude, latitude);
    const statData = {maxAcceptedOffer, maxCancelledOffer, maxAverageReplyTime, maxAverageDistance, };
    const dataWithScore = getSortedDataWithScore(dataWithDistance, statData);


    const trueRankedList = dataWithScore.slice(0, numberOfTrueRank).map((eachData, index) => ({
        ...eachData,
        rank: index + 1
    }));

    if (noOfLittleBehavioral) {
        const littleBehaviorUserList = getLittleOrNoBehavioralUsers(dataWithScore, meanOffer, trueRankedList.length);
        return addLittleBehavioralToData(trueRankedList, littleBehaviorUserList, numberOfTrueRank, Number(noOfLittleBehavioral));
    }
    return trueRankedList;

}


module.exports = getRankedListData;

