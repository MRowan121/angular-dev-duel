import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';
import { userInfo } from '../app.component';
import { number } from 'joi';

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.css'],
})
export class DuelComponent implements OnInit {
  usernameOne: string = '';
  usernameTwo: string = '';
  user1: userInfo = {
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
  user2: userInfo = {
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
  winner: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  receiveUsernameOne(valueEmitted: string) {
    this.usernameOne = valueEmitted;
  }

  receiveUsernameTwo(valueEmitted: string) {
    this.usernameTwo = valueEmitted;
  }

  valid: boolean = false;

  onSubmit() {
    this.userService
      .duelUsers(this.usernameOne, this.usernameTwo)
      .then((response: any) => {
        if (response[0].username && response[1].username) {
          this.user1 = response[0];
          this.user2 = response[1];
          this.valid = true;
          this.calcWinner(this.user1, this.user2);
        }
      });
  }

  calcPerfectRepoPercentage(user: userInfo): number {
    return user['perfect-repos'] / user['public-repos'];
  }

  calcWinner(userOne: userInfo, userTwo: userInfo) {
    let userOnePercent = this.calcPerfectRepoPercentage(userOne);
    let userTwoPercent = this.calcPerfectRepoPercentage(userTwo);
    this.winner =
      userOnePercent > userTwoPercent ? userOne.username : userTwo.username;
    return this.winner;
  }
}
