async function create_user(username, password) {
    let url = "http://localhost:8000/api/users";
    let params = {
        body: JSON.stringify({name: username, password: password}),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
    }
    await fetch(url, params)
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("user_id", data.id);
    });
}