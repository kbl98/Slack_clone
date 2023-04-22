import { Thread } from './thread.class';
import { Comment } from 'src/models/comments.class';
import { User } from 'src/models/user.class';

export class Channel {
  name;
  threads = [];
  currentUser;
  users: any;
  id:any;

  constructor(obj?) {
    this.name = obj ? obj.name : '';
    this.threads = obj ? obj.threads : [];
    this.id= obj ? obj.customIdName:"";
  }

  public toJSON() {
    return {
      name: this.name,
      threads: this.threads
    };
  }

  public getComments(): Comment[] {
    let allComments: Comment[] = [];
    this.threads.forEach((thread) => {
      thread.comments.forEach((comment) => {
        allComments.push(comment);
      });
    });
    return allComments;
  }

  getThread(): Thread[] {
    return this.threads;
  }
}
