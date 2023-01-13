import { Component, OnInit } from '@angular/core';
import { Prescription } from '../model/prescription';
import { Medicineview } from '../model/medicineview';
import { PrescriptionService } from '../service/prescription.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { AppointmentlistService } from '../service/appointmentlist.service';
import { Router } from '@angular/router';
import { Medicineprescription } from '../model/medicineprescription';

@Component({
  selector: 'app-viewmedicine',
  templateUrl: './viewmedicine.component.html',
  styleUrls: ['./viewmedicine.component.scss']
})
export class ViewmedicineComponent implements OnInit {

 
  Entry_View:boolean=true;
  Login_User:string;
  filter:string;
  page:number=1;
  Search_View:boolean=false;

  medicineview:Medicineview=new Medicineview();
  prescriptionData:Prescription[];
  Medicineprescription_Data:Medicineprescription[];
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
      this.AppointmentlistService.Get_Medicine_prescription(prescriptionId).subscribe(Rows =>       
        {
          debugger
          this.Medicineprescription_Data=Rows;  
        },
        Rows => {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
    
  }
}
