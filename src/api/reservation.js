async function createReservation(routeByVehicleId, date) {
    let userId = localStorage.getItem('user_id');
    let url = "http://localhost:8000/api/reservations";
    let params = {
        body: JSON.stringify({
            route_by_vehicle_id: routeByVehicleId,
            user_id: userId,
            date: date
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
    }
    await fetch(url, params)
    .then(response => response.json())
    .then(data => {return});
}

async function getReservation() {
    let userId = localStorage.getItem('user_id');
    let url = `http://localhost:8000/api/reservations?user_id=${userId}`;

    let routes = await fetch(url)
    .then(response => response.json())
    .then(data => {return data});
    return routes;
}
