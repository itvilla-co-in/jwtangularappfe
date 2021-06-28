import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorageService } from './token-storage.service';
import { User } from 'src/app/model/user';
import { environment } from 'src/environments/environment';

const LOGIN_API = 'http://localhost:9191/';

const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json' },
    ),
    observe: 'response' as 'response'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public host = environment.myapiUrl;
  private jtoken: string;

  // TOken Auth - libraty - npm i @auth0/angular-jwt
  // crete a jwt helper private jwthelper = new JwtHelperService()
  // 

  private jwthelper = new JwtHelperService();

  constructor(private http: HttpClient,private token: TokenStorageService) { }

  login(credentials: {username: string, password:string}): Observable<any> {
    //console.log("in auth service " + credentials.username + credentials.password);

    
    return this.http.post(LOGIN_API + 'login', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
   
  }

  register(user): Observable<any> {
    return this.http.post(LOGIN_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  isuserLoggedin(): boolean{
    const temptoken = this.token.getToken();
    //console.log("isuerlogged in called from guard"+ temptoken);
    if(temptoken != null && temptoken !== '' ) {
      //console.log("from auth service " + temptoken);
      //console.log("token subject "+ this.jwthelper.decodeToken(temptoken).sub)
      return true;
    }
    else {
      //console.log("user is not logged in");
    return false;
    }
  
  }

  public getUserFromLocalCache(): User {
    //return JSON.parse(localStorage.getItem('auth-user'));
    return JSON.parse(sessionStorage.getItem('auth-user'));
  }

  public getUserRole(): String {
    //console.log(JSON.stringify(this.getUserFromLocalCache()));
          if(this.isuserLoggedin()) {
            //console.log("calling from auth service checking for isloggedin");
          return this.getUserFromLocalCache().role;
        } else {
          return null;
        }
  }

  public loadToken(): void {
    //this.jtoken = localStorage.getItem('token');
    this.jtoken = sessionStorage.getItem('auth-token');
  }

  public getToken(): string {
    return this.jtoken;
  }

  
}
