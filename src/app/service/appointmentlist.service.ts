import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {environment} from'src/environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentlistService {


  constructor(private httpClient:HttpClient) { } //HttpClient

  Get_Appointment_List(staffId) :Observable<any>
  {
    return this.httpClient.get(environment.apiUrl+'/api/appointmentlist/'+staffId);
  }
  Get_AppointmentHistory() :Observable<any>
  {
    return this.httpClient.get(environment.apiUrl+'/api/appointhistory/');
  }
  getAllAppointmentHistory() :Observable<any>
  {
    return this.httpClient.get(environment.apiUrl+'/api/appointhis/');
  }
  Get_Medicine_prescription(preId) :Observable<any>
  {
    return this.httpClient.get(environment.apiUrl+'/api/medpresc/'+preId);
  }
  Get_Prescription(appId) :Observable<any>
  {
    return this.httpClient.get(environment.apiUrl+'/api/presc/'+appId);
  }
  Get_History_Appointment(ptntId) :Observable<any>
  {
    return this.httpClient.get(environment.apiUrl+'/api/historyappo/'+ptntId);
  }
  Get_Lab_prescription(preId) :Observable<any>
  {
    return this.httpClient.get(environment.apiUrl+'/api/labpresc/'+preId);
  }
  get_Interval() :Observable<any>
  {
    return this.httpClient.get(environment.apiUrl+'/api/interval/');
  }
  //insert Patient
  insertPrescription(prescription_) :Observable<any>
  {
    return this.httpClient.post(environment.apiUrl+'/api/prescription/',prescription_);
  }
  saveMedicinePrescription(Medicineprescription_) :Observable<any>
  {
    return this.httpClient.post(environment.apiUrl+'/api/medprescription/',Medicineprescription_);
  }
  saveTestPrescription(Medicineprescription_) :Observable<any>
  {
    return this.httpClient.post(environment.apiUrl+'/api/testprescription/',Medicineprescription_);
  }
  saveNote(note) :Observable<any>
  {
    return this.httpClient.post(environment.apiUrl+'/api/notesave/',note);
  }
}
