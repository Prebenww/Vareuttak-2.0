const users = [{
    name: "Duste Mikkel"
}, {
    name: "Ann Satt"
}, {
    name: "Jobb ErHer"
}]

var username = req.params.username;

res.json(users[username - 1]);