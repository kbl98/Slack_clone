export class Comment {
   comment: string;
    author:string;
    date;
  
    constructor(obj?){
        this.author=obj? obj.author:"";
        this.comment=obj? obj.comment:"";
        this.date=obj? obj.date:"";
    }
  
    public commentToJSON() {
      return {
        author: this.author,
       comment: this.comment,
       date:this.date
      };
    }
  }