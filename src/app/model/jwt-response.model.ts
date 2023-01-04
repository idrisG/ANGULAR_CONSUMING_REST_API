export class JwtResponse {
    type!:string;
    token!:string;
    username!:string;
    roles!:Array<string>;

    constructor(type:string, token:string, username:string, roles:Array<string>){
        this.type = type;
        this.token = token;
        this.username = username;
        this.roles = roles;
    }
}
