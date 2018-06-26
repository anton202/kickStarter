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
    try{
    let file = element.files[0];
    let reader =  new FileReader();
    const that = this;
    reader.onloadend =  function() {
      value.img = reader.result;

      that.server.createProject(value).subscribe(result=>{
        if (result) {
          that.projStatus = 'project created successfully';
        } else {
          that.projStatus = 'Something went wrong, the project did not created';
        }
      });
    }
    reader.readAsDataURL(file);
  }catch(err){this.projStatus = "somthing went wrong, make shure all the fields are filled as required"}
  }


  ngOnInit(){}

}
