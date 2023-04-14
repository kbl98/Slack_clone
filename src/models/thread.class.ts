
import { Comment } from "./comments.class";
export class Thread{
    author;
    authorPic;
    date;
    text:string;
    comments=[];
    datestring;
    dateOfThread;

    constructor(obj?){
        this.author=obj? obj.author:"";
        this.authorPic=obj? obj.authorPic:"serious-woman.svg";
        this.date=obj? obj.date:"";
        this.text=obj? obj.text:"";
        this.comments=obj? obj.comments:"";
        this.datestring=obj? obj.datestring:"";
    }

    threadToJSON(){
        return{
            author:this.author,
            authorPic:this.authorPic,
            date:this.date,
            text:this.text,
            comments:this.comments,
            datestring:this.datestring

        }
    }


}