import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { ProductService } from '../../_services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  public data: any = {};
  public image: any;
  public types: any = [
    { type: 'Cong nghe' },
    { type: 'Gia dung' },
    { type: 'quan ao' }
  ]

  public uploader: FileUploader = new FileUploader({ url: 'http://localhost:4000/users/uploadAvatar' });

  constructor(private activeModal: NgbActiveModal, private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      console.log("----------- file : ", file);
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any) => {
      this.image = JSON.parse(response).file;
      console.log('Uploaded File Details:', JSON.parse(response));
      console.log(this.image);
      // this.toastr.success('File successfully uploaded!');
    };
  }

  createProduct() {
    this.data.image = this.image;
    this.data.timeCreated = new Date(this.data.timeCreated).getTime();
    this.productService.registerProduct(this.data).subscribe((data) => {
      if (data.status != 200) {
        return;
      }
      alert("tao moi thanh cong !");
      this.close();
    }
    ); 
  }

  // updateEPL() {
  //   let payload = {
  //     image: this.image
  //   }
  //   console.log(payload);
  //   this.productService.registerProduct(payload).subscribe((data) => {
  //     if (data.status != 200) {
  //       return;
  //     }
  //     alert("tao moi anh thanh cong !");
  //     this.close();
  //   }
  //   );
  // }

  close() {
    this.activeModal.close();
  }

}
