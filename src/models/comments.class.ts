export class Comment {
   comment: string;
    author:string;
  
    constructor(obj?){
        this.author=obj? obj.author:"";
        this.comment=obj? obj.comment:"";
    }
  
    public commentToJSON() {
      return {
        author: this.author,
       comment: this.comment
       
      };
    }
  }