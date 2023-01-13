import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import {environment} from'src/environments/environment'
import { Observable } from 'rxjs';
import { Prescription} from '../model/prescription'
@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  constructor(private httpClient:HttpClient) { } //HttpClient

  Get_Prescription(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + '/api/prescall');  
  }

}
