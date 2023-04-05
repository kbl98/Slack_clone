export class Message{

    author:string;
    text:string;
   date;

    constructor(obj?){
        this.author=obj? obj.author:"";
        this.text=obj? obj.text:"";
        this.date=obj? obj.date:"";
    }

    public toJSON(){
       return{
       author:this.author, 
       text:this.text,
       date:this.date
       }
    }

}