import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { StaffService } from 'src/app/service/staff.service';

@Component({
  selector: 'app-labdashboard',
  templateUrl: './labdashboard.component.html',
  styleUrls: ['./labdashboard.component.scss']
})
export class LabdashboardComponent implements OnInit {
  Dashboard_Edit:boolean;
  Dashboard_Save:boolean;
  Dashboard_Delete:boolean;

  missedfollowup_count: number = 1;

  followup_count: number = 1;

   
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  myInnerHeight: number;
  issLoading: boolean;

  Login_User: string = "0";
  Menu_Id: number = 9;



  Dashboard_Count:number;
  Dashboard_Count1: number;
  Dashboard_Count2:number;
  Dashboard_Count3:number; 

  Edit_Page_Permission: any;


  Graph_Button: boolean = false;

  Enquiry_Source_title = '';
  Enquiry_Source_type = 'PieChart';
  Enquiry_Source_data = [
    
  ];
  Enquiry_Source_columnNames = [];
  Enquiry_Source_options = {
    is3D: true,
  };
  width = 550;
  height = 400;



  Title_Bar = '';
Type_Bar = 'BarChart';
  Data_Bar = [
 
];
columnNames_Bar = ['Source', 'Count'];
options_Bar = {
  is3D: true,
};

Permissions: any;
  constructor(private router: Router,public dialogBox: MatDialog, private staffService: StaffService) { }

  ngOnInit(): void {
    //this.Get_Dashboard_Count();
  }

  Click_No2()
  {
        this.router.navigateByUrl('/labtest');  
  }
  Click_No3()
  {
      this.router.navigateByUrl('/labs');
     
  }
}
