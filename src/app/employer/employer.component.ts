import { AnimateTimings } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { ApiService } from 'src/service/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent implements OnInit {
  all_jobs: any[] = [];
  uid: any = '';
  constructor(private ser: ApiService, private router: Router) { }

  ngOnInit(): void {
    // let id = localStorage.getItem('id');
    // if (id == null) {
    //   Swal.fire({
    //     title: 'You have to login to Post Job',
    //     showCancelButton: true,
    //     confirmButtonText: 'Login',
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       this.router.navigate(['/signin'])
    //     }
    //   })
    // }
    // else {
    //   this.getuser();
    // }

    //  this.getuser();
    this.all_job_titles();
  }
  getuser() {
    this.uid = localStorage.getItem('id');
    let data = {
      tbl_user_id: this.uid
    }
    this.ser.get_user_by_id(data).subscribe(res => {
      console.log('RES--------', res);
      if (res != 'datanotfound') {
        this.fileName = res.data[0].job_upload_file
        this.employer_account.patchValue({
          fname: res.data[0].employer_fname,
          lname: res.data[0].employer_lname,
          phone: res.data[0].employer_phone_number,
          emp_address: res.data[0].employer_address,
          zipcode: res.data[0].employer_zipcode,
          state: res.data[0].employer_state,
          city: res.data[0].employer_city,
          country: res.data[0].employer_country,
          email: res.data[0].email,

        })
        if (res.data[0].upload_resume != '') {
          this.icon_1 = false;
          this.img_div = true;
          this.fileName = res.data[0].upload_resume
        }
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong. Pls login again.',
        })
        // setTimeout(() => {
        //   this.router.navigate(['/signin']);
        // }, 5000);
        return
      }

    })
    // console.log('IIIIIIII',this.interestList)
  }

  fileName: any;
  imgurl = this.ser.imgURL;
  icon_1 = true;
  img_div = false;

  // bar=10;
  create_employee_form = true;

  employer_account = new FormGroup({
    fname: new FormControl(null, [Validators.required]),
    lname: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    emp_address: new FormControl(null, [Validators.required]),
    zipcode: new FormControl(null, [Validators.required]),
    state: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    country: new FormControl(null, [Validators.required]),
    job_title: new FormControl(null, [Validators.required]),
    com_address: new FormControl(null),
    company_name: new FormControl(null),
    designation: new FormControl('',),
    website: new FormControl(null),
    job_type: new FormControl('', [Validators.required]),
    hiring_candidiates: new FormControl(null, [Validators.required]),
    hiring_days: new FormControl(''),
    min_salary: new FormControl(null),
    max_salary: new FormControl(null),
    salary_type: new FormControl(''),
    document: new FormControl(null),
    description: new FormControl(null),
    email: new FormControl(null),

  })

  all_job_titles() {
    this.ser.all_job_titles().subscribe(res => {
      console.log('job', res)
      this.all_jobs = [];
      let res1: any = res;
      for (let i = 0; i < res1.length; i++) {
        this.all_jobs.push(res1[i]);
      }
      console.log('All job', this.all_jobs)
    })
  }
  onsubmit(d: any) {
    if (this.employer_account.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all required fileds with red color.',
      })
      return
    } else {
      let data = {
        employer_fname: d.fname,
        employer_lname: d.lname,
        employer_phone_number: d.phone,
        employer_country: d.country,
        employer_state: d.state,
        employer_city: d.city,
        employer_zipcode: d.zipcode,
        employer_address: d.emp_address,
        job_title: d.job_title,
        job_company_name: d.company_name,
        job_designation: d.designation,
        company_website_url: d.website,
        job_company_address: d.com_address,
        job_type: d.job_type,
        job_vacancy: d.hiring_candidiates,
        no_of_days_for_hire: d.hiring_days,
        job_upload_file: this.fileName,
        job_description: d.description,
        job_minimum_salary: d.min_salary,
        job_maximum_salary: d.max_salary,
        job_salary_type: d.salary_type,
        tbl_user_id: this.uid
      }
      console.log('beofre', data)
      this.ser.employer_post_job(data).subscribe(res => {
        console.log('JOB POST', res)
        if (res != "job_posted") {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong. Please try again.',
          })
          return
        }
        else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Job Posted Successfully',
            showConfirmButton: false,
            timer: 1500
          })

        }
        setTimeout(function () {
          window.location.href = '/all-employers'
        }, 2000)
      })



    }
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log('hh', file)
    if (file) {
      this.img_div = true;
      this.fileName = file.name;
      // this.icon_1=false
      const formData = new FormData();
      formData.append("thumbnail", file);
      let data = {
        input_image: file
      }
      console.log('aaa', data);
      this.ser.image1(file).subscribe(res => {
        console.log('GERE', res);
      })
    }
  }
  back_to_Home() {
    window.location.href = '/home'
  }
  get_city_state_by_zipcode() {
    let zipcode = this.employer_account.value['zipcode']
    let data = {
      zipcode: zipcode
    }
    this.ser.get_city_state_by_zipcode(data).subscribe(res => {
      console.log('ZIP', res)

      this.employer_account.patchValue({
        city: res[0].city_name,
        state: res[0].state_name
      })
    })
  }

  get fname() { return this.employer_account.get('fname') }
  get lname() { return this.employer_account.get('lname') }
  get phone() { return this.employer_account.get('phone') }
  get emp_address() { return this.employer_account.get('emp_address') }
  get zipcode() { return this.employer_account.get('zipcode') }
  get state() { return this.employer_account.get('state') }
  get city() { return this.employer_account.get('city') }
  get country() { return this.employer_account.get('country') }
  get job_title() { return this.employer_account.get('job_title') }
  get com_address() { return this.employer_account.get('com_address') }
  get company_name() { return this.employer_account.get('company_name') }
  get designation() { return this.employer_account.get('designation') }
  get job_type() { return this.employer_account.get('job_type') }
  get hiring_candidiates() { return this.employer_account.get('hiring_candidiates') }

}
