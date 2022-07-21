
const geolib = require('geolib');

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function uniqueRandom (min, max, arrayLength, pickedNumbers = new Set()){
    const randomNumber = getRndInteger(min, max);
    pickedNumbers.add(randomNumber);
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