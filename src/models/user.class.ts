export class User {
    username: string;
    email: string;
    password: string;
    userpicture: any;

  constructor(obj?: any) {

    this.username = obj ? obj.username : ''; // if-Abfrage mit "?" ob obj.firstName eingefügt wird oder mit ":"-oder ein leerer String mit '' geingefügt wird
    this.email = obj ? obj.email : '';
    this.password = obj ? obj.password : '';
    this.userpicture = obj ? obj.street : [];

  }

  public toJSON() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
      userpicture: this.userpicture
    }
  }
}
