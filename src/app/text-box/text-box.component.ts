import { Component, Input, ViewChild } from '@angular/core';
// import { FormGroup } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent {

  // messageText: string = '';
  valid: boolean = false;
  // @ViewChild('messageInput')
  // messageInput: QuillEditorComponent;
  // messageForm: FormGroup;
  // @Input() textBoxPath;

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['link'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['code-block', 'blockquote'],
      [{ color: [] }, { background: [] }],
      ['image'],
    ],
  }



  constructor(private firestore: AngularFirestore) {


  }


  check() {
    let quillEditorTextfield = document.querySelector('.ql-editor');
    // if (this.textBoxPath == 'channels') {
    //   // this.channel.postInChannel();
    //   this.messageForm.reset();
    // } else if (this.textBoxPath == 'create-chat') {
    //   // this.chatService.createChatRoom();
    //   this.messageForm.reset();
    // } else if (this.textBoxPath == 'thread') {
    //   // this.channel.postComment();
    //   this.messageForm.reset();
    // } else if (this.textBoxPath == 'chatroom') {
    //   // this.chatService.addMessage();
    //   this.messageForm.reset();
    // } else if (this.textBoxPath == 'chat-thread') {
    //   // this.chatService.msgToChatThread();
    //   this.messageForm.reset();
    // } else if (this.textBoxPath == 'edit') {
    //   // this.chatService.editMsg(this.chatService.chatMsg);
    // } else if (this.textBoxPath == 'edit-channel') {
    //   // this.channel.editMessage(this.chatService.chatMsg);
    // }

    // console.log(this.textBoxPath);
    console.log(quillEditorTextfield.innerHTML);
    quillEditorTextfield.innerHTML = "";

  }













  

  checkEditor(event: any) {
    if (event.event === 'text-change') {
      let text = event.html;
      if (text !== null) {
        this.valid = true;
        // this.channel.newMessage = text;
        // this.channel.newComment = text;
        // this.chatService.chatMsg = text;
      } else {
        this.valid = false;
      }
    }
  }

  onSelectionChanged = (event) => {
    if (event.oldRange == null) {
      this.onFocus(event);
    }
    if (event.range == null) {
      this.onBlur(event);
    }
  }

  onFocus(event) {
    event.editor.theme.quill.container.style = "border-color: #818385 !important;";
    event.editor.theme.modules.toolbar.container.style = "border-color: #818385 !important;";
  }

  onBlur(event) {
    event.editor.theme.quill.container.style = "border-color: #464646 !important;";
    event.editor.theme.modules.toolbar.container.style = "border-color: #464646 !important;";
  }
}