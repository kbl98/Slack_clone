export class DirectChat{
    author;
    UserMessages=[];
   
   

    constructor(obj?){
        this.author=obj? obj.author:"";
        this.UserMessages=obj? obj.UserMessages:[""];
        
    }

    threadToJSON(){
        return{
            author:this.author,
            UserMessages:this.UserMessages,
           
        }
    }
    

}