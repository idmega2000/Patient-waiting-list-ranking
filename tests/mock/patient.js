let faker = require('faker');


const generatePatient = (numberOfPatients) => {
    const patients = [];
    let i = 0;
    while (i < numberOfPatients) {
        i++;
        patients.push({
            id: faker.random.uuid(),
            name: faker.name.findName(),
            location: {
                latitude: faker.address.latitude(),
                longitude: faker.address.longitude()
            },
            age: faker.random.number({ min: 21, max: 90 }),
            acceptedOffers: faker.random.number({ min: 0, max: 100 }),
            canceledOffers: faker.random.number({ min: 0, max: 100 }),
            averageReplyTime: faker.random.number({ min: 1, max: 3600 }),
        });
    }
    return patients;
}


export default generatePatient;