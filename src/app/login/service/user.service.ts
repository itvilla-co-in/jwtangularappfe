import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpEvent } from '@angular/common/http';
 import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { CustomHttpRespone } from 'src/app/model/custom-http-response';
 
@Injectable({providedIn: 'root'})
export class UserService  {
  private host = 'http://localhost:9191';
  nameChange: BehaviorSubject<string> = new BehaviorSubject<string>('refresh');
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }
 
public addUserForm(loggedInUsername: string, user: User, profileImage: File): FormData {
  const formData = new FormData();
  //console.log("calling from userservice updateuserformdata checking values " + user.firstName + user.lastName
  //+ user.username + user.email + user.role + user.active + user.notLocked);
  formData.append('currentUsername', loggedInUsername);
  formData.append('firstName', user.firstName);
  formData.append('lastName', user.lastName);
  formData.append('username', user.username);
  formData.append('email', user.email);
  formData.append('role', user.role);
  formData.append('profileImage', profileImage);
  formData.append('isActive', JSON.stringify(user.active));
  formData.append('isNonLocked', JSON.stringify(user.notLocked));
  return formData;
}

  public updateUserForm(loggedInUsername: string, user: User): FormData {
    const formData = new FormData();
    //console.log("calling from userservice updateuserformdata checking values " + user.firstName + user.lastName
    //+ user.username + user.email + user.role + user.active + user.notLocked);
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('role', user.role);
    //formData.append('profileImage', profileImage);
    formData.append('isActive', JSON.stringify(user.active));
    formData.append('isNonLocked', JSON.stringify(user.notLocked));
    return formData;
  }

  public updateUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/update`, formData);
  }

  public deleteUser(username: string): Observable<CustomHttpRespone> {
    return this.http.delete<CustomHttpRespone>(`${this.host}/user/delete/${username}`);
  }
  
  public addUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/add`, formData);
  }


  /*
 
 

  public resetPassword(email: string): Observable<CustomHttpRespone> {
    return this.http.get<CustomHttpRespone>(`${this.host}/user/resetpassword/${email}`);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<User>> {
    return this.http.post<User>(`${this.host}/user/updateProfileImage`, formData,
    {reportProgress: true,
      observe: 'events'
    });
  }





  public getUsersFromLocalCache(): User[] {
    if (localStorage.getItem('users')) {
        return JSON.parse(localStorage.getItem('users'));
    }
    return null;
  }

  
  */

}
