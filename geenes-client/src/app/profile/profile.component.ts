import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {User} from '../_models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getCurrent().subscribe(current => {
      this.user = current
      console.log(this.user)
    })
  }

}
