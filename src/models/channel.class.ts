import { Thread } from "./thread.class";
import { Comment } from 'src/models/comments.class';
import { User } from 'src/models/user.class';

export class Channel {

    name;
    threads=[];
    currentUser;
    users: any;

    constructor(obj?){
        this.name=obj? obj.name:"";
        this.threads=obj? obj.threads:[]
    }

    public toJSON(){
       return{
        name:this.name, 
        threads: this.threads
       }
    }

    getComments(): Comment[] {
        let allComments: Comment[] = [];
        this.threads.forEach(thread => {
          thread.comments.forEach(comment => {
            allComments.push(comment);
          });
        });
        return allComments;
      }
      
      getUsers(): string[] {
        let usernames: string[] = [];
        for (let user of this.users) {
          usernames.push(user.username);
        }
        return usernames;
      }
      
      getThread(): Thread[] {
        return this.threads;
      }

}