import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { EmployeeService } from '@/_services';

@Component({
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  public employees: any = [
    // {fullName : 'Toan', id: 1},
    // {fullName : 'Toan 1', id: 2},
    // {fullName : 'Toan 2', id: 3},
    // {fullName : 'Toan 3', id: 4},
  ]

  public roles: any = [
    {role : 'User'},
    {role : 'Admin'}
  ]
  constructor(private auth: AuthenticationService, private router: Router, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getAllEmployee().subscribe((res: any) => {
      if (res.status != 200) {
        console.log(res.msg);
        return;
      }
      this.employees = res.data;
      console.log(res);
    });
  }

  register(form: NgForm) {
    console.log(form.value);
    this.auth.register(form.value).subscribe(
      (data) => {
        if (data.status != 200) {
          return;
        }
        this.router.navigateByUrl("/admin");
      },
      err => {
        console.error(err);
      }
    );
  }

}
