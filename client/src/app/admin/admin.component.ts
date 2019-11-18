import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService, EmployeeService } from '@/_services';
import { Employee } from '@/_models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoEmployeeComponent } from './info-employee/info-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {


    employees: Employee[];

    constructor(private userService: UserService, private employeeService: EmployeeService, private modal: NgbModal) { }

    ngOnInit() {
        this.getAllEmployees();
    }

    getAllEmployees(): void {
        this.employeeService.getAllEmployee().subscribe((res: any) => {
            if (res.status != 200) {
                console.log(res.msg);
                return;
            }
            this.employees = res.data;
            console.log(res);
        });
    };

    openPopup1(employee) {
        const modalRef = this.modal.open(InfoEmployeeComponent, { size: 'lg'})
        modalRef.componentInstance.id = employee.id;
        modalRef.result.then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
        console.log(modalRef.componentInstance.id)
        console.log(employee.id);
    }

    openPopup2(employee) {
        const modalRef = this.modal.open(UpdateEmployeeComponent, { size: 'lg'})
        modalRef.componentInstance.id = employee.id;
        modalRef.result.then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
        console.log(modalRef.componentInstance.id)
        console.log(employee.id);
    }

}