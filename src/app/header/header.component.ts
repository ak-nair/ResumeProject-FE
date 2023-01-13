import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

userName:any;
roleName:any;


  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.userName=sessionStorage.getItem('USERNAME');
    if(sessionStorage.getItem('ACCESS_ROLE')==='1'){
      this.roleName="ADMIN";
    }else if (sessionStorage.getItem('ACCESS_ROLE')==='2'){
      this.roleName="RECEPTIONIST";
    }else if (sessionStorage.getItem('ACCESS_ROLE')==='3'){
      this.roleName="DOCTOR";
    }else if (sessionStorage.getItem('ACCESS_ROLE')==='4'){
      this.roleName="LAB TECHNICIAN";
    }else if (sessionStorage.getItem('ACCESS_ROLE')==='5'){
      this.roleName="PHARMACIST";
    }
  }

  //go home
  goHome(){
    if(sessionStorage.getItem('ACCESS_ROLE')==='1'){
      this.router.navigateByUrl('/staffdash');
    }else if (sessionStorage.getItem('ACCESS_ROLE')==='2'){
      this.router.navigateByUrl('/apt');
    }else if (sessionStorage.getItem('ACCESS_ROLE')==='3'){
      this.router.navigateByUrl('/applist');
      window.location.reload();
    }else if (sessionStorage.getItem('ACCESS_ROLE')==='4'){
      this.router.navigateByUrl('/labdash');
    }else if (sessionStorage.getItem('ACCESS_ROLE')==='5'){
      this.router.navigateByUrl('/medicinedash');
    }
  }

  // log out
  logOut(){
    console.log("log out")
    this.authService.logOut();
    this.router.navigateByUrl('');
  }

}