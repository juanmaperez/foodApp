
import { Component, OnInit, Input }                  from '@angular/core';

import { Router }                                     from '@angular/router';
import { SessionService } from './../../services/session.service';
import { FileUploader, FileSelectDirective }  from "ng2-file-upload";


@Component({
  selector: 'imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.scss']
})

export class ImageuploadComponent implements OnInit {
 

  @Input() url : string;
  
    id : string = '';
  
    imagepreview : any;
    
    uploader: FileUploader;
  
    file = { 
      name : ""
    }
  
    feedback: string;
  
    constructor( private router : Router, private session : SessionService ) { }
  
    ngOnInit() {
      this.id=this.session.user._id;
      console.log("this.id", this.id);
      console.log( "my url to upload img", this.url)
      this.uploader = new FileUploader({
        
         url: this.url
     
       });
  
      this.uploader.onSuccessItem = (item, base64) => {
       
       this.imagepreview.src = base64;
        //this.feedback = JSON.parse(response).message;
      
      };
  
      this.uploader.onErrorItem = (item, response, status, headers) => {
        this.feedback = JSON.parse(response).message;
      
      };
    }
  
    submit() {
        console.log("inside image upload");
        console.log("this.id", this.id);
        console.log( "url", this.url)
        
        this.uploader.onBuildItemForm = (item, form) => {
      
        //No authentication headers
        item.withCredentials = false;
        form.append('name', this.file.name);
  
      };
  
      this.uploader.uploadAll();
    }
    ngAfterViewChecked(){
     this.imagepreview = document.getElementById('imagepreview');
  
    }
  }

