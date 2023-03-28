export class Channel{

    name;
    id;
    threads=[];
    currentUser;

    constructor(obj?){
        this.name=obj? obj.name:"";
        this.id=obj? obj.id:"";
        this.threads=obj? obj.threads:""
    }

    public toJSON(){
       return{
        name:this.name, 
       id:this.id,
       threads:this.threads
       }
    }

}