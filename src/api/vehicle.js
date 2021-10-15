async function getVehicleCompanies(driveName, origin, destination) {
    let url = `http://localhost:8000/api/companies/relations?driver_name=${driveName}&origin=${origin}&destination=${destination}`;

    let vehicleCompanies = await fetch(url)
    .then(response => response.json())
    .then(data => {
        data.forEach(entity => {
            let origin = entity.origin;
            let destination = entity.destination;

            delete entity.origin;
            delete entity.destination;

            entity.route = `${origin} - ${destination}`;
        })
        return data
    });

    vehicleCompanies = groupByDriverAndCompany(vehicleCompanies);
    
    console.log(vehicleCompanies);
    return vehicleCompanies;
}


function groupByDriverAndCompany(vehicleCompanies) {
    let data = [];
    for (let i = 0; i < vehicleCompanies.length; i++) {
        let j;
        for (j = 0; j < data.length; j++) {
            if (
                data[j].name === vehicleCompanies[i].name &&
                data[j].driver_name === vehicleCompanies[i].driver_name
            ) {
                data[j].route.push(vehicleCompanies[i].route);
                j--;
                break;
            }
        }

        if (j === data.length) {
            data.push(
                {
                    name: vehicleCompanies[i].name,
                    driver_name: vehicleCompanies[i].driver_name,
                    route: [vehicleCompanies[i].route]
                }
            )
        }
    }
    return data;
}