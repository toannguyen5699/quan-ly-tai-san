import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService, EmployeeService, AuthenticationService } from '@/_services';
import { Employee } from '@/_models';
import { Router } from "@angular/router";

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {


  @Input() id: any;

  employees: Employee[];
  employeeById: any = {};
  public data: any = {};
  public genders: any = [
    { gender: 'Nam' },
    { gender: 'Nữ' }
  ]
  public statuss: any = [
    { status: 'Active' },
    { status: 'Wait' },
    { status: 'Delete' }
  ]

  constructor(private activeModal: NgbActiveModal, private userService: UserService, private employeeService: EmployeeService, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  updateEmployee() {
    this.data.employeeId = this.id;
    this.data.birthDate = new Date(this.data.birthDate).getTime();
    this.data.jobEndDate = new Date(this.data.jobEndDate).getTime();
    this.data.jobStartDate = new Date(this.data.jobStartDate).getTime();
    console.log(this.data)
    this.authenticationService.updateEmployee(this.data).subscribe((data) => {
      if (data.status != 200) {
        return;
      }
      alert("tao moi thanh cong !");
      this.close();
    }
    );
  }

  close() {
    this.activeModal.close();
  }

}
