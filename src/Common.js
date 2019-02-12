
function User(object) {
    this.username = object.username
    this.id = object.id
}

let user = new User({username: '', id: 0})

export default user