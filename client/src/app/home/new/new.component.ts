import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router } from "@angular/router";
import { User } from '@/_models';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  currentUser: User;
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

  constructor(private activeModal: NgbActiveModal, private auth: AuthenticationService, private router: Router) {
    this.currentUser = this.auth.currentUserValue;
  }

  ngOnInit() {
  }

  updateEmployee() {
    this.data.employeeId = this.currentUser.employeeId;
    this.data.birthDate = new Date(this.data.birthDate).getTime();
    this.data.jobEndDate = new Date(this.data.jobEndDate).getTime();
    this.data.jobStartDate = new Date(this.data.jobStartDate).getTime();
    console.log(this.data)
    this.auth.updateEmployee(this.data).subscribe((data) => {
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
