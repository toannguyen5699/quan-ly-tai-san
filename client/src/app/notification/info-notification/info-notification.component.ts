import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '@/_services';

@Component({
  selector: 'app-info-notification',
  templateUrl: './info-notification.component.html',
  styleUrls: ['./info-notification.component.css']
})
export class InfoNotificationComponent implements OnInit {

  @Input() id: any;

  productInOrders: any = [];

  constructor(private ProductService: ProductService) { }

  ngOnInit() {
    this.ProductService.getAllInfoProductFromOrder(this.id).subscribe((res: any) => {
      this.productInOrders = res.data;
    })
  }

}
