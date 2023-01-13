import { Component, OnInit } from '@angular/core';
import { Prescription } from '../model/prescription';
import { PrescriptionService } from '../service/prescription.service';
import { AppointmentlistService } from '../service/appointmentlist.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Router } from '@angular/router';
import { Testprescription } from '../model/testprescription';
import { Testview } from '../model/testview';

@Component({
  selector: 'app-viewlabtest',
  templateUrl: './viewlabtest.component.html',
  styleUrls: ['./viewlabtest.component.scss']
})
export class ViewlabtestComponent implements OnInit {

  Entry_View:boolean=true;
  Login_User:string;
  filter:string;
  page:number=1;
  Search_View:boolean=false;
  Testprescription_Data:Testprescription[];
  Testprescription_:Testprescription=new Testprescription();
  
  prescriptionData:Prescription[];

  testview:Testview=new Testview();
  testview_Data:Testview[];
  constructor(private AppointmentlistService:AppointmentlistService,private pescriptionService:PrescriptionService,public dialogBox: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.Get_Prescription();
  }


  Get_Prescription()
  {
    
    this.pescriptionService.Get_Prescription().subscribe(Rows =>       
      {
        this.prescriptionData=Rows;  
      },
      Rows => {
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
      });
  }
  view_test(prescriptionId)
  {
    this.Entry_View=false;
    this.Search_View=true;
    debugger
      this.AppointmentlistService.Get_Lab_prescription(prescriptionId).subscribe(Rows =>       
        {
          debugger
          this.Testprescription_Data=Rows;  
        },
        Rows => {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
    
  }
  edit_test(teste:Testview){

    this.testview=Object.assign({},teste);

  }


  
}
