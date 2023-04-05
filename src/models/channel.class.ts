import { Thread } from "./thread.class";

export class Channel {

    name;
    threads=[];
    currentUser;

    constructor(obj?){
        this.name=obj? obj.name:"";
        this.threads=obj? obj.threads:[""]
    }

    public toJSON(){
       return{
        name:this.name, 
        threads: this.threads
       }
    }

}