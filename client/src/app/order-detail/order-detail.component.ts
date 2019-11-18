import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '@/_services';
import { ProductService } from '../_services/product.service'
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '@/_models';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  public currentUser: User;
  public data: any = {};
  public employees: any = []

  constructor(private userService: UserService,private auth: AuthenticationService, private router: Router, private productService: ProductService) { 
    this.currentUser = this.auth.currentUserValue;
  }

  ngOnInit() {
    this.userService.getAllAdmin().subscribe((res: any) => {
      if (res.status != 200) {
        console.log(res.msg);
        return;
      }
      this.employees = res.data;
      console.log(res);
    });
  }

  registerOrderDetail() {
    console.log(this.data);
    this.data.employeeIDrequest = this.currentUser.employeeId
    this.data.employeeIDresponse = this.employees.employeeIDresponse
    this.data.status = 'WAIT';
    this.productService.registerProductOrder(this.data).subscribe((data) => {
      if (data.status != 200) {
        return;
      }
      alert("tao moi thanh cong !");
      // this.router.navigateByUrl("/register");
    }
    );
  }

}
