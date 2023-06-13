export default class userDTO {
    constructor(user){
        this.name = user.first_name;
        this.lastname = user.last_name;
        this.age = user.age;
        this.email = user.email;
        this.role = user.admin;
        this.fullName = `${this.name} - ${this.lastname}`;
    }
}