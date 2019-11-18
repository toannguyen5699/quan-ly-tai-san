import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';


@Component({
  templateUrl: './register-employee.component.html',
})
export class RegisterEmployeeComponent implements OnInit {
  public data: any = {};
  public genders: any = [
    { gender: 'Nam' },
    { gender: 'Nữ' }
  ]
  public statuss: any = [
    { status: 'Active'},
    { status: 'Wait' },
    { status: 'Delete'}
  ]

  constructor(
    private auth: AuthenticationService,
    private router: Router,
  ) { }

  registerEmployee() {
    this.data.birthDate = new Date(this.data.birthDate).getTime();
    this.data.jobEndDate = new Date(this.data.jobEndDate).getTime();
    this.data.jobStartDate = new Date(this.data.jobStartDate).getTime();
    console.log(this.data)
    this.auth.registerEmployee(this.data).subscribe((data) => {
      if (data.status != 200) {
        return;
      }
      alert("tao moi thanh cong !");
      // this.router.navigateByUrl("/register");
    }
    );
  }

  ngOnInit() {
  }
}
