

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

    // get the longitiude and latitude
    const { latitude, longitude } = fascilityLocation;

    // get the statistics information that allow to calculate the different percentages of the patient
    const statData = getStatData(patientData, longitude, latitude);
    const { dataWithDistance, meanOffer } = statData;
    const dataWithScore = getSortedDataWithScore(dataWithDistance, statData);

    // add rank to the specified rankes amount(default to 10)
    const trueRankedList = dataWithScore.slice(0, numberOfTrueRank).map((eachData, index) => ({
        ...eachData,
        rank: index + 1
    }));

    // if there is need to add the no to little behavioral data 
    if (noOfLittleBehavioral) {
        const littleBehaviorUserList = getLittleOrNoBehavioralUsers(dataWithScore, meanOffer, trueRankedList.length);
        return addLittleBehavioralToData(trueRankedList, littleBehaviorUserList, numberOfTrueRank, Number(noOfLittleBehavioral));
    }
    return trueRankedList;

}


module.exports = getRankedListData;

