import { Component, OnInit } from '@angular/core';
import { ProductInfo } from '@/_models';
import { ProductInCart } from '@/_models';
import { ProductOrder } from '@/_models';
import { ProductService, SharedService } from '@/_services';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  public data: any = [];
  public dataProductInCart: any = [];  // productInCart
  productAddedTocart: any = [];
  orderDetail: any = [];  // productOrder
  quantity: number;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getAllProductOrder();
    this.productAddedTocart = this.productService.getProductFromCart();

    this.productService.removeAllProductFromCart();
    this.productService.addProductToCart(this.productAddedTocart);
  }

  getAllProductOrder(): void {
    this.productService.getAllProductOrder().subscribe((res: any) => {
      console.log(res);
      if (res.status != 200) {
        console.log(res.msg);
        return;
      }
      this.orderDetail = res.data;
      console.log(res);
      console.log(this.orderDetail);
    });
  };

  summit() {
    // this.dataProductInCart.status = "WAIT";
    // for (var i = 0; i <= this.productAddedTocart.length; i++) {
    //   return this.dataProductInCart.productInfoID = this.productAddedTocart[i].id;
    // }
    // for (var i = 0; i <= this.productAddedTocart.length; i++) {
    // console.log(this.productAddedTocart[i].id);
    // }

    this.dataProductInCart = [];
    for (let i in this.productAddedTocart) {
      for (let y in this.orderDetail) {
        this.dataProductInCart.push({
          productOrderID: this.orderDetail[y].id,
          productInfoID: this.productAddedTocart[i].id,
          amount: this.productAddedTocart[i].quantity,
          timeModified: null,
          createdBy: null,
          modifiedBy: null
        });
      }
    }
    console.log(this.dataProductInCart);

    this.productService.registerProductInCart(this.dataProductInCart).subscribe((data) => {
      if (data.status != 200) {
        return;
      }
      alert("tao moi thanh cong !");
    }
    ); 
  }


}
