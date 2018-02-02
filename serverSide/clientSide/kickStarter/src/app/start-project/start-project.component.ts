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

   async encodeImageFileAsURL(element,value) {
    var file = element.files[0];
    var reader = await new FileReader();
    reader.onloadend = function() {
      value.img = reader.result;
      console.log(value)
    }
    reader.readAsDataURL(file);
    this.server.createProject(value).subscribe(res=>this.projStatus = res);
  }

  ngOnInit(){}

}
