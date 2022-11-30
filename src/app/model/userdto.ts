export class Userdto{
    id : number;
    username : string;
    birthdate : string;
    country : string;
    phoneNumber! : string;
    gender! : string;
    constructor(id : number, username : string, birthdate : string, country : string, phoneNumber? : string, gender? : string){
        this.id=id;
        this.username=username;
        this.birthdate=birthdate;
        this.country=country;
        if(phoneNumber){
            this.phoneNumber=phoneNumber;
        }
        if(gender){
            this.gender=gender;
        }
    }

}