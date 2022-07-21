
const geolib = require('geolib');

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * @description - method to uniquely generate an array of numbers based on min and max values
 * @param {number} min - the min value
 * @param {number} max - the max value
 * @param {number} arrayLength - the lenght of the array to return
 * @param {Array} pickedNumbers - the set that hold unique number
 * @returns {object} the constant percentage for that age
 */
function uniqueRandom (min, max, arrayLength, pickedNumbers = new Set()){
    const randomNumber = getRndInteger(min, max);
    pickedNumbers.add(randomNumber);
    // check if it has the size of the array lenght and return
    if (pickedNumbers.size === arrayLength) {
        return Array.from(pickedNumbers);
    }
    return uniqueRandom(min, max, arrayLength, pickedNumbers);
};


function getOrReturnMax (numberValue, currentMaxValue){
    if (numberValue > currentMaxValue) {
        return numberValue
    }
    return currentMaxValue
};


function getDistanceInKm (location, fascilityLongitude, fascilityLatitude){
    const { longitude, latitude } = location;
    const distanceInMeters = geolib.getDistance(
        { latitude: fascilityLongitude, longitude: fascilityLatitude },
        { latitude, longitude }, 10
    );
    return (distanceInMeters/1000);
};


module.exports = { getRndInteger, uniqueRandom, getOrReturnMax, getDistanceInKm }