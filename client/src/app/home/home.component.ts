import { Component } from '@angular/core';

import { User, Employee } from '@/_models';
import { UserService, AuthenticationService, EmployeeService } from '@/_services';
import { NewComponent } from './new/new.component';
import { ChangeAvatarComponent } from './change-avatar/change-avatar.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    currentUser: User;
    employeeFromApi: Employee;

    constructor(
        private userService: UserService,
        private employeeService: EmployeeService,
        private authenticationService: AuthenticationService,
        private modal: NgbModal
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.employeeService.getEmployeeById(this.currentUser.employeeId).subscribe((res:any) => {
            this.employeeFromApi = res.data;
            console.log(this.employeeFromApi)
        });
    }

    openPopup1(){
        this.modal.open(NewComponent, {
            size: 'lg',
        }).result.then(res => {
            console.log("dasdasd")
        })
    }

    openPopup2(){
        this.modal.open(ChangeAvatarComponent, {
            size: 'lg',
        }).result.then(res => {
            console.log("dasdasd")
        })
    }
}