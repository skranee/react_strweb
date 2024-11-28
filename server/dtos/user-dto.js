export default class UserDto {
    id;
    role;
    username;
    balance;

    constructor (model) {
        this.id = model._id;
        this.role = model.role;
        this.username = model.username;
        this.balance = model.balance;
    }
}