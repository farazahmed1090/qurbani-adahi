import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/service/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
//@ts-ignore
import Typewriter from't-writer.js';
@Component({
  selector: 'app-find-jobs',
  templateUrl: './find-jobs.component.html',
  styleUrls: ['./find-jobs.component.css']
})
export class FindJobsComponent implements OnInit {
  allJobs: any[] = [];
  detailsection: any = false;
  jobTitle: any;
  deadline: any;
  minSalary: any;
  maxSalary: any;
  experienceReq: any;
  jobType: any;
  description: any;
  datePosted: any;
  home_search: any;
  job_id: any;
  notAvailable = false;


  constructor(private ser: ApiService, private http: HttpClient, private router: Router) {
    // this.SearchBar.patchValue([searchJob]:)
  }
  ngOnInit(): void {
    

  
  

    this.check_ser_var();
    if (this.home_search != null) {
      this.onKeyUp();
    }
  }

  SearchBar = new FormGroup({
    searchJob: new FormControl()
  })
  check_ser_var() {
    this.home_search = localStorage.getItem('job-key');
    if (this.home_search != null) {
      this.SearchBar.patchValue({
        searchJob: this.home_search
      })
      localStorage.removeItem('job-key')
    }
    else {
      this.getJobs();
    }
  }

  check_resume() {
    let id: any = localStorage.getItem('id')
    if (id == null) {
      this.getJobs();
      return
    } else if (id != null) {
      let data = {
        tbl_job_seeker_id: id
      }
      this.ser.get_job_seeker_by_id(data).subscribe(res => {
        console.log(res, 'user data')
        if (res[0].upload_resume != null) {
          return
        } else {
          window.location.href = '/upload-resume'
        }
      })
    }
  }

  onKeyUp() {
    if (this.SearchBar.controls.searchJob.value == '') {
      this.notAvailable = false;
      this.getJobs()
    }
    else {
      let data = {
        job_name: this.SearchBar.controls.searchJob.value
      }
      // this.csubmit();
      this.ser.search_job_by_name(data).subscribe(res => {
        console.log(res, "job by input")
        if (res != "datanotfound") {
          this.notAvailable = false;
          this.allJobs = [];
          for (let i = 0; i < res.length; i++) {
            this.allJobs.push(res[i]);
          }
        }
        else if(res == "datanotfound") {
          this.notAvailable = true;
          return;
        }
      }
      )
    }
  }
  // method to search Job

  // method To Call All Jobs
  getJobs() {
    this.ser.all_posted_jobs().subscribe(res => {
      console.log(res)
      this.allJobs = [];
      for (let i = 0; i < res.length; i++) {
        this.allJobs.push(res[i]);
      }
    })
  }
  // method To Call All Jobs

  // method to View Job details
  submit(d: any) {
    this.detailsection = true;
    let data = {
      tbl_job_id: d
    }
    console.log('DATA', data)
    this.ser.get_posted_job_by_id(data).subscribe(res => {
      console.log(res, "selected job")
      this.jobTitle = res[0].job_title
      this.deadline = res[0].job_deadline
      this.minSalary = res[0].min_salary
      this.maxSalary = res[0].max_salary
      this.experienceReq = res[0].job_experience_require
      this.jobType = res[0].job_type
      this.description = res[0].job_description
      this.datePosted = res[0].time_stamp
      this.job_id = res[0].tbl_job_id
    })


  }
  // method to View Job details


  csubmit() {
    this.detailsection = false;
  }

  confirm_apply_now() {
    let data = {
      tbl_user_id: localStorage.getItem('id'),
      tbl_job_id: this.job_id
    }
    if (localStorage.getItem('id') == null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please upload your Resume to apply for job.',
      })
      this.router.navigate(['/upload-resume']);
    }
    else {
      console.log('Apply before', data)
      this.ser.job_seeker_apply_for_job(data).subscribe(res => {
        console.log('Apply', res)
        if (res == 'applied') {
          Swal.fire(
            '',
            'You have successfully applied for this job.',
            'success'
          )
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
    }
  }

}
