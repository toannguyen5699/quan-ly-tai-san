import { Component, OnInit } from '@angular/core';

import { ProductService } from '@/_services';
import { AuthenticationService } from '../_services';
import { ProductInfo } from '@/_models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProductComponent } from './create-product/create-product.component';
import { User, Role } from '../_models';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  products: ProductInfo[];
  currentUser: User;

  constructor(private productService: ProductService, private modal: NgbModal, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct(): void {
    this.productService.getAllProduct().subscribe((res: any) => {
      console.log(res);
      if (res.status != 200) {
        console.log(res.msg);
        return;
      }
      this.products = res.data;
      console.log(res);
    });
  };

  openPopup1() {
    this.modal.open(CreateProductComponent, {
      size: 'lg',
    }).result.then(res => {
      console.log("dasdasd")
    })
  }


  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isUser() {
    return this.currentUser && this.currentUser.role === Role.User;
  }


}
