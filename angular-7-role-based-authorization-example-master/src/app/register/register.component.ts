import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../_services/authentication.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  credentials: TokenPayload = {
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role:""
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit() {
  }

  register() {
    this.auth.register(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl("/admin");
      },
      err => {
        console.error(err);
      }
    );
  }

}
