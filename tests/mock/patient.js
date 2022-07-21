let faker = require('faker');


const generatePatient = (numberOfPatients) => {
    const patients = [];
    let i = 0;
    while (i < numberOfPatients) {
        i++;
        patients.push({
            id: faker.datatype.uuid(),
            name: faker.name.findName(),
            location: {
                latitude: faker.address.latitude(),
                longitude: faker.address.longitude()
            },
            age: faker.datatype.number({ min: 21, max: 90 }),
            acceptedOffers: faker.datatype.number({ min: 0, max: 100 }),
            canceledOffers: faker.datatype.number({ min: 0, max: 100 }),
            averageReplyTime: faker.datatype.number({ min: 1, max: 3600 }),
        });
    }
    return patients;
}


export default generatePatient;