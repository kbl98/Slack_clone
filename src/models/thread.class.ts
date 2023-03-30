export class Thread{
    author;
    authorPic;
    date;
    text;
    comments=[];

    constructor(obj?){
        this.author=obj? obj.author:"";
        this.authorPic=obj? obj.authorPic:"";
        this.date=obj? obj.date:"";
        this.text=obj? obj.text:"";
        this.comments=obj? obj.comments:[""];
    }

    threadToJSON(){
        return{
            author:this.author,
            authorPic:this.authorPic,
            date:this.date,
            text:this.text,
            comments:this.comments

        }
    }

}