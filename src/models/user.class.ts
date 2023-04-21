export class User {
    username: string;
    email: string;
    password: string;
    userpicture: any;
    userMassages: any[]=[];
    chatpartner:any[]=[];
    users = [];

  constructor(obj?: any) {
    this.chatpartner=obj ? obj.chatpartner : [];
    this.username = obj ? obj.username : ''; // if-Abfrage mit "?" ob obj.firstName eingefügt wird oder mit ":"-oder ein leerer String mit '' geingefügt wird
    this.email = obj ? obj.email : '';
    this.password = obj ? obj.password : '';
    this.userpicture = obj ? obj.userpicture : ["serious-woman.svg"];
    this.userMassages = obj ? obj.userMassages : [];
  }

  public toJSON() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
      userpicture: this.userpicture,
      userMassages:this.userMassages,
      chatpartner:this.chatpartner
    }
  }

  public getUser(): string[] {
    let users: string[] = [];
    debugger;
    this.users.forEach(username => {
        username.forEach(user => {
            if (!users.includes(user)) {
                users.push(user);
            }
        });
    });

    return users;
}
}
