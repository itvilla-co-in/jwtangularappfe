import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { UserService } from 'src/app/login/service/user.service';
import { CustomHttpRespone } from 'src/app/model/custom-http-response';
import { User } from 'src/app/model/user';
import { AdduserComponent } from './adduser/adduser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { Role } from '../../model/role';
import { AuthService } from 'src/app/login/service/auth.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit, OnDestroy {

  public users: User[];
  public user: User;
  public editUser = new User();
  public editedUser = new User();
  private currentUsername: string;

  public refreshing: boolean;
  private subscriptions: Subscription[] = [];
  
  constructor(private userService: UserService,public dialog: MatDialog, private authservice: AuthService) { }

  ngOnInit(): void {
    this.getUsers(true);
    this.subscriptions.push(this.userService.nameChange.subscribe((value) => { 
      this.getUsers(true);        
    })
);

 
  }

  public getUsers(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.userService.getUsers().subscribe(
        (response: User[]) => {
          this.userService.addUsersToLocalCache(response);
          this.users = response;
          this.refreshing = false;
          if (showNotification) {
            //this.sendNotification(NotificationType.SUCCESS, `${response.length} user(s) loaded successfully.`);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          //this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.refreshing = false;
        }
      )
    );

  }

  public onEditUser(editUser: User): void {
    this.editUser = editUser;
    this.currentUsername = editUser.username;
    //this.clickButton('openUserEdit');
    const dialogRef = this.dialog.open(EdituserComponent, {
      width: '500px',
      data: {User: this.editUser}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      this.editedUser = result;
    });
  }

  public onaddUser(): void {
    //this.editUser = editUser;
    //this.currentUsername = editUser.username;
    //this.clickButton('openUserEdit');
    const dialogRef = this.dialog.open(AdduserComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      //this.editedUser = result;
    });
  }


/*   private clickButton(buttonId: string): void {
    //console.log("opening button click model"+ buttonId);
    document.getElementById(buttonId).click();
     
  } */

   public searchUsers(searchTerm: string): void {
    const results: User[] = [];
  /*
    for (const user of this.userService.getUsersFromLocalCache()) {
      if (user.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          user.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          user.username.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          user.userId.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !searchTerm) {
      this.users = this.userService.getUsersFromLocalCache();
    }
     */
  }
 
   public onSelectUser(selectedUser: User): void {
  //  this.selectedUser = selectedUser;
  //  this.clickButton('openUserInfo');
  }  

   public onDeleteUder(username: string): void { 
     this.subscriptions.push(
      this.userService.deleteUser(username).subscribe(
        (response: CustomHttpRespone) => {
          this.getUsers(false);
        },
        (error: HttpErrorResponse) => {
           
        }
      )
    );      
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
 
  public get isAdmin(): boolean {
    //console.log(this.authservice.getUserRole());
    return this.authservice.getUserRole() === Role.ADMIN;

  }

  public get isUser(): boolean {
    //console.log(this.authservice.getUserRole());
    return this.authservice.getUserRole() === Role.USER;

  }

}
