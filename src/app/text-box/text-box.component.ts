import { Component } from '@angular/core';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent {

  valid: boolean = false;
  message: string = '';

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

  constructor() { }



  getEditorInput(event: any) {
    if (event.event === 'text-change') {
      this.message = event.html;
      if (this.message !== null) {
        this.valid = true;
      } else {
        this.valid = false;
      }
    }
    console.log(this.message);
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