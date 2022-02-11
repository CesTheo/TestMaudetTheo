import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { ApiService } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  providers: [ApiService],
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnInit {

  data = {
  }

  constructor(public apiService: ApiService,public router: Router) {
    this.data = new Post();
  }

  PutPost(){
    this.apiService.createItem(this.data).subscribe((response) => {
      this.router.navigate(['post-list']);
    });
    }

  ngOnInit(){
  }

}
