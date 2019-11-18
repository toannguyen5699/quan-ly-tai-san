import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { Router } from "@angular/router";
import { User } from '@/_models';

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.css']
})
export class ChangeAvatarComponent implements OnInit {

  public currentUser: User;
  public avatar: any;
  public data: any = {};
  public genders: any = [
    { gender: 'Nam' },
    { gender: 'Nữ' }
  ]

  public uploader: FileUploader = new FileUploader({ url: 'http://localhost:4000/users/uploadAvatar' });

  constructor(private activeModal: NgbActiveModal, private auth: AuthenticationService, private router: Router) {
    this.currentUser = this.auth.currentUserValue;
  }


  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      console.log("----------- file : ", file);
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any) => {
      this.avatar = JSON.parse(response).file;
      console.log('Uploaded File Details:', JSON.parse(response));
      console.log(this.avatar);
      // this.toastr.success('File successfully uploaded!');
    };
  }

  updateEPL() {
    let payload = {
      employeeId: this.currentUser.employeeId,
      avatar: this.avatar
    }
    console.log(payload);
    this.auth.updateEmployee(payload).subscribe((data) => {
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
