import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import {Prescription} from '../model/prescription';
import {Appointment} from '../model/appointment';
import {Medicineprescription} from '../model/medicineprescription';
import {Testprescription} from '../model/testprescription';
import {Medicine} from '../model/medicine';
import {Labtest} from '../model/labtest';
import {Medicineinterval} from '../model/medicineinterval';
import {Note} from '../model/note';
import {AppointmentlistService} from '../service/appointmentlist.service'
import {MedicineService} from '../service/medicine.service';
import {LabtestService} from '../service/labtest.service';
import { NotExpr } from '@angular/compiler';

@Component({
  selector: 'app-appointmentlist',
  templateUrl: './appointmentlist.component.html',
  styleUrls: ['./appointmentlist.component.scss']
})
export class AppointmentlistComponent implements OnInit {

  Entry_View:boolean=true;
  Search_View:boolean=false;
  history_view:boolean=false;
  test_view:boolean=false;
  note_view:boolean=false;
  diagonsis_view:boolean=true;
  diagonsis_hide:boolean=true;
  Login_User:string;
  filter:string;
  page:number=1;
  Appointment_Data:Appointment[];

  Appointment_History_Data:[];
  patient_name:string;

  prescription_:Prescription=new Prescription();;
  appointment:Appointment=new Appointment();;
  Medicineprescription_Data:Medicineprescription[];
  Medicineprescription_:Medicineprescription=new Medicineprescription();
  Testprescription_Data:Testprescription[];
  Testprescription_:Testprescription=new Testprescription();
  appointmentId:number;
  presId:number;
  staffId:number;

  medicine:Medicine=new Medicine();
  medicine_data:Medicine[];
  medicine_temp:Medicine=new Medicine();

  test:Labtest=new Labtest();
  test_temp:Labtest=new Labtest();
  test_data:Labtest[];

  interval:Medicineinterval=new Medicineinterval();
  interval_temp:Medicineinterval=new Medicineinterval();
  interval_data:Medicineinterval[];

  Note_hidden:boolean=false;

  note:Note =new Note();
  constructor(private AppointmentlistService:AppointmentlistService, private LabtestService :LabtestService ,private MedicineService_: MedicineService,public dialogBox: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.Login_User=sessionStorage.getItem(("STAFFID"));
    this.Get_Appointment_List();
    this.Testprescription_Data=[];
    this.Medicineprescription_Data=[];
    this.Load_Medicine();
    this.Load_Interval();
    this.Load_Lab();
  }

view_click(appo:Appointment)
  {
    this.Entry_View=false;
    this.Search_View=true;
    this.test_view=false;
    this.history_view=false;
    this.note_view=false;
    this.appointment=Object.assign({},appo);
    this.appointmentId=this.appointment.appointmentId;
    this.staffId=this.appointment.staffId;
    this.diagonsis_hide=true;
    this.diagonsis_view=false;
    this.Note_hidden=true;
  }
  Edit_click(appointmentId:number){

    this.Entry_View=false;
    this.Search_View=true;
    this.test_view=false;
    this.history_view=false;
    this.diagonsis_hide=false;
    this.diagonsis_view=true;
    this.Note_hidden=false;
    this.note_view=false;
    this.Get_Prescription(appointmentId);

  }
  Get_Prescription(appointmentId)
  {

  this.AppointmentlistService.Get_Prescription(appointmentId).subscribe(Rows => { 
    
    this.presId=Rows.prescriptionId;
    this.prescription_.diagnosis=Rows.diagnosis;
    this.Get_Lab_prescription(this.presId);
    this.Medicine_List_Data(this.presId);
   
  },
  Rows => {
      const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
  });
}
History_click(patientId){
  this.Entry_View=false;
  this.Search_View=false;
  this.test_view=false;
  this.history_view=true;
  this.note_view=false;
  
  this.AppointmentlistService.Get_History_Appointment(patientId).subscribe(Rows => { 
    debugger
    this.Appointment_History_Data=Rows;
    this.patient_name=Rows[0].patientName;
  },
  Rows => {
      const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
  });

}
Load_Interval(){
  this.AppointmentlistService.get_Interval().subscribe(Rows => {   
      this.interval_data = Rows;
      this.interval_temp.medicineIntervalId = 0;
      this.interval_temp.medicineIntervalName = "SELECT";
      this.interval_data.unshift(Object.assign({}, this.interval_temp));
      this.interval = this.interval_data[0];
  },
  Rows => {
      const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
  });
}
Load_Medicine(){
  this.MedicineService_.getAllMedicinesdrop().subscribe(Rows => {   
      this.medicine_data = Rows;
      this.medicine_temp.medicineId = 0;
      this.medicine_temp.medicineName = "SELECT";
      this.medicine_data.unshift(Object.assign({}, this.medicine_temp));
      this.medicine = this.medicine_data[0];
  },
  Rows => {
      const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
  });
}

Load_Lab(){
  this.LabtestService.getLabtests().subscribe(Rows => {
      this.test_data = Rows;
      this.test_temp.testId = 0;
      this.test_temp.testName = "SELECT";
      this.test_data.unshift(Object.assign({}, this.test_temp));
      this.test = this.test_data[0];
  },
  Rows => {
      const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
  });
}

Get_Appointment_List()
{

  this.AppointmentlistService.Get_Appointment_List(Number(this.Login_User)).subscribe(Rows =>       
  {
    this.Appointment_Data=Rows;

  },
  Rows => {
  // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
  });
  }
clr_medcine(){
  this.Medicineprescription_.course="";

  this.Medicineprescription_.medicineprescriptionId=0;
  if(this.medicine_data!=null && this.medicine_data != undefined)
  this.medicine=this.medicine_data[0];

  if(this.interval_data!=null && this.interval_data != undefined)
  this.interval=this.interval_data[0];
}
Add_Medicine()
{
  if (this.presId>0)
  {
    if(this.medicine.medicineId==0||this.medicine.medicineId==undefined||this.medicine.medicineId==null){
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Add Medicine',Type:"3"}});
      return
    }
    if(this.interval.medicineIntervalId==0||this.interval.medicineIntervalId==undefined||this.interval.medicineIntervalId==null){
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Add interval',Type:"3"}});
      return
    }
    if(this.Medicineprescription_.course==""||this.Medicineprescription_.course==undefined||this.Medicineprescription_.course==null){
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Add Course',Type:"3"}});
      return
    }
    this.Medicineprescription_.prescriptionId=this.presId;
    this.Medicineprescription_.medicineId=this.medicine.medicineId;
    this.Medicineprescription_.medicineIntervalId=this.interval.medicineIntervalId;
    this.AppointmentlistService.saveMedicinePrescription(this.Medicineprescription_).subscribe(Save_status => {
      
      if(Save_status==1){
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Medicine Added',Type:"false"}});
     
        this.clr_medcine(); 
        this.Medicine_List_Data(this.presId); }
       else if(Save_status==2){
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Medicine Duplication',Type:"3"}});
      } 
      else{
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Medicine Updated',Type:"false"}});
     
        this.clr_medcine(); 
        this.Medicine_List_Data(this.presId); } 
    },
    Rows => {
       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });    
  }
  else{
  const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'First Add Diagonsis', Type: "3" } });
  }
}
Medicine_List_Data(presId)
{  
  this.AppointmentlistService.Get_Medicine_prescription(presId).subscribe(Rows =>       
    {
      this.Medicineprescription_Data=Rows;  
    },
    Rows => {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}
edit_med(med:Medicineprescription)
{
  this.Medicineprescription_=Object.assign({},med);

  for (var i = 0; i < this.medicine_data.length; i++)
  {
    if (this.Medicineprescription_.medicineId == this.medicine_data[i].medicineId)
    this.medicine=this.medicine_data[i];
  }
  
  for (var i = 0; i < this.interval_data.length; i++)
  {
    if (this.Medicineprescription_.medicineIntervalId == this.interval_data[i].medicineIntervalId)
    this.interval=this.interval_data[i];
  }
}

clr_lab(){

  if(this.test_data!=null && this.test_data != undefined)
  this.test=this.test_data[0];
  this.Testprescription_.testprescriptionId=0;
}
Add_Lab()
  {
    if (this.presId>0)
    {
      if(this.test.testId==0||this.test.testId==undefined||this.test.testId==null){
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Add Test',Type:"3"}});
        return
      }
      this.Testprescription_.prescriptionId=this.presId;
      this.Testprescription_.testId=this.test.testId;
      this.AppointmentlistService.saveTestPrescription(this.Testprescription_).subscribe(Save_status => {
      if(Save_status==1){
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Test Added',Type:"false"}});
     
        this.clr_lab();
        this.Get_Lab_prescription(this.presId);
       }else  if(Save_status==2){
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Test Duplication',Type:"3"}});
      }
      else{
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Test Updated',Type:"false"}});
     
        this.clr_lab();
        this.Get_Lab_prescription(this.presId); }
      },
      Rows => {
         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
      });    
    }
    else{
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'First Add Diagnosis', Type: "3" } });
    }
}
Add_Note(){

  this.Entry_View=false;
  this.Search_View=false;
  this.test_view=false;
  this.history_view=false;
  this.note_view=true;
}

Get_Lab_prescription(presId)
{
  
  this.AppointmentlistService.Get_Lab_prescription(presId).subscribe(Rows =>       
    {
      this.Testprescription_Data=Rows;  
    },
    Rows => {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}
edit_lab(labe:Testprescription)
{
  this.Testprescription_=Object.assign({},labe);

  for (var i = 0; i < this.test_data.length; i++)
  {
  if (this.Testprescription_.testId == this.test_data[i].testId)
  this.test=this.test_data[i];
  }
}
Save_Note(){

  this.note.prescriptionId=this.presId;
      this.AppointmentlistService.saveTestPrescription(this.note).subscribe(Save_status => {
      if(Save_status==1){
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Note Added',Type:"false"}});
      }this.close_click();
      },
      Rows => {
         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
      });    
}
save_prescription()
{
    this.prescription_.appointmentId=this.appointmentId;
    this.AppointmentlistService.insertPrescription(this.prescription_).subscribe(Save_status => {
      this.presId=Save_status;
      if(this.presId>0)
      {      
        this.diagonsis_hide=false;
        this.diagonsis_view=true; 
      }
    },
    Rows => {
       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });    
}
close_click(){
  this.Entry_View=true;
  this.Search_View=false;
  this.test_view=false;
  this.history_view=false;
  this.note_view=false;
}
}
