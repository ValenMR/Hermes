async function getRoutes(price, origin, destination) {
    let url = `http://localhost:8000/api/routes/relations?price=${price}&origin=${origin}&destination=${destination}`;

    let routes = await fetch(url)
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("routes", JSON.stringify(data));
        return data
    });
    return routes
}