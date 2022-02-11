import { Component } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  data: any;

  constructor(public restProvider: RestService) {
    this.getPost();
  }

  ngOnInit() {
    console.log("Bienvenue")
  }

  getPost() {
    this.restProvider.getPost()
    .then(data => {
    this.data = data;
    console.log(this.data);
    });
    }
  
}
