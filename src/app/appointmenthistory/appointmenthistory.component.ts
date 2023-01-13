import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import {AppointmentlistService} from '../service/appointmentlist.service'
import { Appointment } from '../model/appointment';

@Component({
  selector: 'app-appointmenthistory',
  templateUrl: './appointmenthistory.component.html',
  styleUrls: ['./appointmenthistory.component.scss']
})
export class AppointmenthistoryComponent implements OnInit {

  filter:string;
  Login_User:string;
  page:number=1;
  Entry_View:boolean=true;
  Search_View:boolean=false;
  
  Appointment_Data:Appointment[];
  constructor(private AppointmentlistService:AppointmentlistService, public dialogBox: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.Login_User=sessionStorage.getItem(("STAFFID"));
    this.Get_Appointment_List();
  }

Get_Appointment_List()
{

  this.AppointmentlistService.getAllAppointmentHistory().subscribe(Rows =>       
  {
    this.Appointment_Data=Rows;

  },
  Rows => {
  // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
  });
  }
}
