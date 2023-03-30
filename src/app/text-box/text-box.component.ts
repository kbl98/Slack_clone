import { Component } from '@angular/core';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent {

  quillConfiguration = {
    toolbar: [
      ['bold', 'italic', 'strike'],
      ['link'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ 'align': [] }], 
      ['code-block','blockquote'],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
  }

}
