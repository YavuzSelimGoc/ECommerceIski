import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Editor from 'ckeditor5/build/ckeditor';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ckeditor-test',
  templateUrl: './ckeditor-test.component.html',
  styleUrls: ['./ckeditor-test.component.scss']
})
export class CkeditorTestComponent implements OnInit{
  ckAddForm:FormGroup;


    editorConfig = {

      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'outdent',
          'indent',
          '|',
          'imageUpload',
          'blockQuote',
          'insertTable',
          'mediaEmbed',
          'undo',
          'redo'
        ]
      },
      simpleUpload: {
        // The URL that the images are uploaded to.
        uploadUrl: environment.apiUrl+'api/upload',
  
    },
      language: 'tr',
      licenseKey: '',
  
  
    };
  

  ngOnInit(): void {
 
  //  this.clk()
  
  }
 
  public Editor = Editor;

 

}