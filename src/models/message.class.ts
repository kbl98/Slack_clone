export class Message{
    chatpartner:string;
    author:string;
    text:string;
   date;

    constructor(obj?){
        this.chatpartner=obj? obj.chatpartner:"";
        this.author=obj? obj.author:"";
        this.text=obj? obj.text:"";
        this.date=obj? obj.date:"";
    }

    public toJSON(){
       return{
        chatpartner:this.chatpartner,
       author:this.author, 
       text:this.text,
       date:this.date
       }
    }

}