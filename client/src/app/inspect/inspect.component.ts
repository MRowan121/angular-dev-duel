import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';
import { userInfo } from '../app.component';

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.component.html',
  styleUrls: ['./inspect.component.css'],
})
export class InspectComponent implements OnInit {
  username: string = '';
  user: userInfo = {
    username: '',
    name: '',
    location: '',
    bio: '',
    avatar_url: '',
    titles: [],
    'favorite-language': '',
    'public-repos': 0,
    'total-stars': 0,
    'highest-starred': 0,
    'perfect-repos': 0,
    followers: 0,
    following: 0,
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  receiveUsername(valueEmitted: string) {
    this.username = valueEmitted;
  }

  error: any = '';
  valid: boolean = false;

  onSubmit() {
    this.userService.inspectUser(this.username).then(
      (response: any) => {
        if (response.username) {
          this.error = '';
          this.user = response;
          this.valid = true;
        }
      },
      (error: any) => {
        console.log(error);
        if (error.status === 400) {
          this.error = `${error.statusText}`;
        } else if (error.status === 404) {
          this.error = `Username ${error.statusText}`;
        } else {
          this.error = 'Error. Please try again.';
        }
      }
    );
  }
}
