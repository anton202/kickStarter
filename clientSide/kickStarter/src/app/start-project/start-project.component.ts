import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-project',
  templateUrl: './start-project.component.html',
  styleUrls: ['./start-project.component.css']
})
export class StartProjectComponent implements OnInit {
editorContent;
stratProjectInfo;

  constructor() { }

   encodeImageFileAsURL(element,value) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      value.img = reader.result;
      console.log(value)
    }
    reader.readAsDataURL(file);
  }

}
