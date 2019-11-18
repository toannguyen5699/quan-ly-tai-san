import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, SharedService } from './_services';
import { User, Role } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html', styleUrls: ['./app.component.css'] })
export class AppComponent {
    currentUser: User;

    cartItemCount:number=0;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private sharedService: SharedService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {
        this.sharedService.currentMessage.subscribe(msg => this.cartItemCount = msg);
    }

    get isAdmin() {
        return this.currentUser && this.currentUser.role === Role.Admin;
    }

    get isUser() {
        return this.currentUser && this.currentUser.role === Role.User;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}