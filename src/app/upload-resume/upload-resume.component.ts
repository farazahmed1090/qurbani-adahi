import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/service/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
@Component({
  selector: 'app-upload-resume',
  templateUrl: './upload-resume.component.html',
  styleUrls: ['./upload-resume.component.css']
})
export class UploadResumeComponent implements OnInit {
  fileName: any='';
  imgurl = this.ser.imgURL;
  img_div = false;
  icon_1 = true;
  interestItem: any;
  interestList: any[] = [];
  interests: any;
  count: any = 0;
  allstates: any[] = [];
  allcities: any[] = [];
  all_jobs: any[] = [];
  Invalid_cv=false;
  constructor(private ser: ApiService, private http: HttpClient, private router: Router) { }


  ngOnInit(): void {
    this.all_job_titles();

    let id = localStorage.getItem('id');
    if (id == null) {
      Swal.fire({
        title: 'You have to login to upload Resume.',
        showCancelButton: true,
        confirmButtonText: 'Login',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/signin'])
        }
      })
    }
    else {
      this.getuser();
    }
  }

  getuser() {
    let id = localStorage.getItem('id');
    let data = {
      tbl_user_id: id
    }
    this.ser.get_user_by_id(data).subscribe(res => {
      console.log('RES--------', res);
      if(res!='datanotfound'){
         for (let i = 0; i < res.job_interests.length ; i++) {
        this.interestList.push(res.job_interests[i]) 
    }
      this.uploadForm.patchValue({
        email: res.data[0].email,
        fname: res.data[0].job_seeker_fname,
        lname: res.data[0].job_seeker_lname,
        phone: res.data[0].job_seeker_phone_number,
        qualification: res.data[0].qualification,
        interest: res.data[0].job_interests,
        description: res.data[0].job_seeker_summary,
      })

      if(res.data[0].upload_resume!=''){
        this.icon_1=false;
        this.img_div=true;
        this.fileName=res.data[0].upload_resume
        // this.uploadForm.controls.document=res.data[0].upload_resume
        console.log('RRRR', this.uploadForm.value)
      }
      }
     else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
      return
     }

    })
console.log('IIIIIIII',this.interestList)
  }
  uploadForm = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    qualification: new FormControl('', [Validators.required]),
    interest: new FormControl('', ),
    description: new FormControl('', ),
    document: new FormControl('',[Validators.required]),
  })

  remove(id: any) {
    if (id > -1) {
      this.interestList.splice(id, 1);

    }
  }


  interest(e: any) {
    this.interestItem = e.value;
    if (this.interestList.includes(e.value)) {
      return;
    }
    else {
      this.interestList.push(e.value);
    }
  }

  all_job_titles() {
    this.ser.all_job_titles().subscribe(res => {
      console.log('job', res)
      this.all_jobs = [];
      let res1: any = res;
      for (let i = 0; i < res1.length; i++) {
        this.all_jobs.push(res1[i]);
      }
    })
  }




  onsubmit(d: any) {
    if (this.uploadForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid Information',
      })
      if(this.fileName==''){
this.Invalid_cv=true
      }
      console.log(this.uploadForm.value)
      return;
    } else {
      this.Invalid_cv=false;
      let id = localStorage.getItem('id');
      if (id != null) {
        let data = {
          job_seeker_fname: d.fname,
          job_seeker_lname: d.lname,
          job_seeker_phone_number: d.phone,
          job_seeker_country: d.country,
          job_seeker_state: d.state,
          job_seeker_city: d.city,
          job_seeker_address: d.address,
          job_seeker_zipcode: d.zipcode,
          qualification: d.qualification,
          experience: d.experience,
          job_interests: d.interest,
          // upload_resume: d.document,
          zio_code:'',
          job_seeker_summary: d.description,
          tbl_job_seeker_id: 0,
          uploaded_resume:this.fileName,
          tbl_user_id:id
        }
        console.log('RES CV BEFIRE', data);
        this.ser.job_seeker_profile_update(data).subscribe(res => {
          console.log('RES CV', res);
if(res=='job_seeker_created'){
  Swal.fire(
    'Congratulations! Mr.' + this.uploadForm.controls.fname.value + '.',
    'Your Resume is successfully uploaded. Now you can apply for desired jobs.',
    'success'
  )
setTimeout(() => {
  this.router.navigate(['find-jobs']);
}, 1000);
}
else {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong! Please try again.',
  })
}
        })
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please do login before uploading Resume!',
        })
        this.router.navigate(['/signin']);
      }
    }
  }




  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.img_div = true;
      this.fileName = file.name;
      this.icon_1 = false
      const formData = new FormData();
      formData.append("thumbnail", file);
      let data = {
        input_image: file
      }
      // console.log('aaa',data);
      this.ser.image1(file).subscribe(res => {
        // console.log('GERE',res);
      })
    }
  }
  back_to_Home() {
    window.location.href = '/home'
  }

  get fname() { return this.uploadForm.get('fname') }
  get phone() { return this.uploadForm.get('phone') }
  get email() { return this.uploadForm.get('email') }
  get qualification() { return this.uploadForm.get('qualification') }
  get document() { return this.uploadForm.get('document') }


}