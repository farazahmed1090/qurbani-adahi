import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL= 'https://muhammadsr2.sg-host.com/remote_base_hire/restapi.php?action=';
  imgURL= 'https://muhammadsr2.sg-host.com/remote_base_hire/upload_documents/';
  project_name='RBH';
  search_keyword:any = '';
  constructor(private http :HttpClient) { }
  data:any=[];
 
  employer_post_job(data:any):Observable<any>{
    return this.http.post(`${this.baseURL}employer_post_job`,data)
  } 
  image1(myfile:File): Observable <any> {
    var formdata= new FormData();
    formdata.append('input_file',myfile);
    return this.http.post(`${this.baseURL}upload_document`,formdata)}
    // Employer Component  end

    get_all_states(): Observable <any> {
      return this.http.get(`${this.baseURL}getallstates`)
    }

    get_all_cities(): Observable <any> {
      return this.http.get(`${this.baseURL}get_all_cities`)
    }
    get_city_state_by_zipcode(data:any): Observable <any> {
      return this.http.post(`${this.baseURL}get_city_state_by_zipcode`,data)
    }
    get_all_job_seekers():Observable<any>{
      return this.http.get(`${this.baseURL}get_all_job_seekers`)
    }

    get_job_seeker_by_id(data : any):Observable<any>{
     return this.http.post(`${this.baseURL}get_user_by_id`,data)
    }
    get_user_by_id(data : any):Observable<any>{
      return this.http.post(`${this.baseURL}get_user_by_id`,data)
     }

    job_seeker_profile_update(data : any):Observable<any>{
      return this.http.post(`${this.baseURL}job_seeker_profile_update`,data)
    }

    employer_login(data: any): Observable<any> {
      return this.http.post(`${this.baseURL}employer_login`,data)
    }

    employer_signup(data: any): Observable<any> {
      return this.http.post(`${this.baseURL}employer_signup`,data)
    }
    
    job_seeker_apply_for_job(data: any): Observable<any> {
      return this.http.post(`${this.baseURL}job_seeker_apply_for_job`,data)
    }
    

    // find-jobs
    all_posted_jobs():Observable<any>{
      return this.http.get(`${this.baseURL}all_posted_jobs`)
    }

    get_posted_job_by_id(data:any):Observable<any>{
      return this.http.post(`${this.baseURL}get_posted_job_by_id`,data)
    }
    search_job_by_name(data:any):Observable<any>{
      return this.http.post(`${this.baseURL}search_job_by_name`,data)
    }
    
    contact_us(data:any):Observable<any>{
      return this.http.post(`${this.baseURL}contact_us`,data)
    }
    get_employer_by_id(data:any):Observable<any>{
      return this.http.post(`${this.baseURL}get_user_by_id`,data)
    }
    all_job_titles(){
      return this.http.get(this.baseURL+'all_job_titles')
    }
    forgot_password(data:any):Observable<any>{
      return this.http.post(`${this.baseURL}forgot_password`,data)
    }
    change_password(data:any):Observable<any>{
      return this.http.put(`${this.baseURL}change_password`,data)
    }
    job_seeker_upload_resume(data:any):Observable<any>{
      return this.http.post(`${this.baseURL}job_seeker_upload_resume`,data)
    }
    get_all_testimonails(){
      return this.http.get(this.baseURL+'get_all_testimonails')
    }
    all_jobs_of_employer(data:any):Observable<any>{
      return this.http.post(`${this.baseURL}all_jobs_of_employer`,data)
    }
    job_seeker_all_applied_jobs(data:any):Observable<any>{
      return this.http.post(`${this.baseURL}job_seeker_all_applied_jobs`,data)
    }
  }
