import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { UserService } from 'src/app/login/service/user.service';
import { FileUploadStatus } from 'src/app/model/file-upload.status';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  private currentUsername: string;
  public editUser = new User();
  public fileName: string;
  public fileStatus = new FileUploadStatus();
  public profileImage: File;

  constructor(
    public dialogRef: MatDialogRef<AdduserComponent>,
    //@Inject(MAT_DIALOG_DATA) public editUsertemp: Usertemp,
    private userService: UserService,
    private tokenservice: TokenStorageService) {
    
      
    }

  ngOnInit(): void {
  }
  onaddUser(userForm: NgForm) {
    const formData = this.userService.addUserForm(null, userForm.value, this.profileImage);
    //console.log("updated" + JSON.stringify(userForm.value));

    this.subscriptions.push(
      this.userService.addUser(formData).subscribe(
        (response: User) => {
          this.userService.nameChange.next('refresh');
          this.dialogRef.close();
          this.fileName = null;
          this.profileImage = null;
          userForm.reset();
        },
        (errorResponse: HttpErrorResponse) => {
           console.log(errorResponse);
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
