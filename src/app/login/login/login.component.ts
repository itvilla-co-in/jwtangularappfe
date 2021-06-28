import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/token-storage.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  constructor(private authService: AuthService,private route: ActivatedRoute,
    private router:Router,private tokenStorage: TokenStorageService) { }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  loingtype: string;
  sub: Subscription;

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();


  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      (params: Params) => {
        //console.log("calling from login.component.ts see if we are gettin param" + params['type']);
        this.loingtype=params['type'];
      }
    );
  }

  submit() {
    this.authService.login(this.form.value).subscribe(
      data => {
       this.tokenStorage.saveToken(data.headers.get('Jwt-Token'));
        this.tokenStorage.saveUser(data.body);
        if(this.loingtype==="home"){
          console.log("login success going back to home ");
          this.router.navigate(['/home/apphome'])
        }else if(this.loingtype==="tuthome"){
          this.router.navigate(['/tutorialshome'])
        }

      },
      err => {

      }
     );

  }

  
}
