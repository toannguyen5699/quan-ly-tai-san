import { Component, OnInit } from '@angular/core';

import { ProductService } from '@/_services';
import { AuthenticationService } from '../_services';
import { ProductInfo } from '@/_models';
import { User, Role } from '../_models';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  public orderDetails: any = [];
  public data: any = {};

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getAllOrderDetail();
  }

  getAllOrderDetail(): void {
    this.productService.getAllOrderDetail().subscribe((res: any) => {
      console.log(res);
      if (res.status != 200) {
        console.log(res.msg);
        return;
      }
      this.orderDetails = res.data;
      console.log(res);
    });
  };

  updateStatusOrderDetail(orderDetail) {
      this.data.id = orderDetail.id;
      console.log(this.data);
    this.productService.updateStatus(this.data).subscribe((data) => {
      if (data.status != 200) {
        return;
      }
      alert("tao moi thanh cong !");
    }
    );
  }

}
