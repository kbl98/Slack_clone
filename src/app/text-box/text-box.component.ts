import { Component, EventEmitter, Output } from '@angular/core';
import { SharedService } from '../shared.service';

import 'quill-emoji/dist/quill-emoji.js';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent {

  @Output() myEvent = new EventEmitter();

  valid: boolean = false;
  message: string = '';
  darkmode: boolean = false;

  configuration = {

    'emoji-shortname': true,
    'emoji-textarea': false,
    'emoji-toolbar': true,
    
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['link'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['code-block', 'blockquote'],
      [{ color: [] }, { background: [] }],
      ['image','emoji']
    ],
  }

  constructor(public sharedService: SharedService) {
    setInterval(() => {
      this.darkmode = this.sharedService.sharedBoolean;
    }, 1000 / 30)
  }


  getEditorInput(event: any) {
    if (event.event === 'text-change') {
      setTimeout(() => {
        this.message = event.html;
        if (this.message !== null) {
          this.valid = true;
        } else {
          this.valid = false;
        }
      }, 10);
    }
  }


  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      this.saveMessageToParent();
      this.clear();
    }
  }


  saveMessageToParent() {
    this.myEvent.emit();
    this.clear();
  }



  /**
   * Changes the bordercolors of editor, when clicked
   * @param event 
   */
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

  clear() {
    let editors = document.querySelectorAll('.ql-editor');
    for (let i = 0; i < editors.length; i++) {
      editors[i].innerHTML = '';
    }
    this.message = null;
  }
}