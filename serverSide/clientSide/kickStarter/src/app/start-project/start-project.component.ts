import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-start-project',
  templateUrl: './start-project.component.html',
  styleUrls: ['./start-project.component.css']
})
export class StartProjectComponent implements OnInit {
editorContent;
stratProjectInfo;
projStatus

  constructor(private server: ServerService) { }

  encodeImageFileAsURL(element,value) {
    var file = element.files[0];
    var reader =  new FileReader();
    let that = this;
    reader.onloadend =  function() {
      value.img = reader.result;
      console.log(value)
      that.server.createProject(value).subscribe(result=>that.projStatus = result);
    }
    reader.readAsDataURL(file);
  }


  ngOnInit(){}

}
