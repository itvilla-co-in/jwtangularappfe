import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { UserService } from 'src/app/login/service/user.service';
import { CustomHttpRespone } from 'src/app/model/custom-http-response';
import { FileUploadStatus } from 'src/app/model/file-upload.status';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private currentUsername: string;
  public editUser = new User();
  public fileName: string;
  public fileStatus = new FileUploadStatus();
  public profileImage: File;

  constructor(
    public dialogRef: MatDialogRef<EdituserComponent>,
    @Inject(MAT_DIALOG_DATA) public editUsertemp: Usertemp,
    private userService: UserService,
    private tokenservice: TokenStorageService) {
      //this.editUser = editUsertemp.User;
      this.editUser = Object.assign(this.editUser, editUsertemp.User)
      this.currentUsername = this.editUser.username;
      
    }

  ngOnInit(): void {
  }
  
  onUpdateUser() {
    //console.log("updated" + JSON.stringify(this.editUser))
    //this.tokenservice.getUser().username
    const formData = this.userService.addUserForm(this.currentUsername, this.editUser, this.profileImage);
    this.subscriptions.push(
      this.userService.updateUser(formData).subscribe(
        (response: User) => {
          this.userService.nameChange.next('refresh');
          this.dialogRef.close();
          this.fileName = null;
          this.profileImage = null;
        },
        (error: HttpErrorResponse) => {
           window.alert(error.error.message);
        }
      )
      );
   
  }  

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  public onProfileImageChange(fileName: string, profileImage: File): void {
    this.fileName =  fileName;
    this.profileImage = profileImage;
  }
}

interface Usertemp {
  User: {
    user: User;
  }}
