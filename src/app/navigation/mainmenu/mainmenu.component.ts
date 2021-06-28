import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss']
})
export class MainmenuComponent implements OnInit {

  private titleSubject = new BehaviorSubject<string>('Viewing Users');
  public finaltitle = this.titleSubject.asObservable();
  public user: User = new User();
  isLoggedtutIn = false;
  private roles: string[];
  username: string;
  constructor(private tokenStorageService: TokenStorageService,private router:Router) { }

  ngOnInit(): void {
    this.isLoggedtutIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedtutIn) {
      this.user = this.tokenStorageService.getUser();
      
      //this.roles = this.user.role;

      //this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      //this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = this.user.username;
      //console.log("Calling from mainnav Username " + this.username + "role is " + JSON.stringify(this.roles))
      //console.log("Calling from mainnav entire user " + JSON.stringify(this.user))
    }
  }

  public updateTitle(title: string): void {
    this.titleSubject.next(title);
  }

  logoutfromtut() {
    this.tokenStorageService.signOut();
    this.roles=[];
    this.username="";
    this.isLoggedtutIn=false;
    this.router.navigate(['/home/apphome'])
    //window.location.reload();
  }

} 
