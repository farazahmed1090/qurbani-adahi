import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Aos from 'aos';
import { ApiService } from 'src/service/api.service';
import Swal from 'sweetalert2';
//@ts-ignore
import Typewriter from't-writer.js';

@Component({
  selector: 'app-all-job-seekers',
  templateUrl: './all-job-seekers.component.html',
  styleUrls: ['./all-job-seekers.component.css']
})
export class AllJobSeekersComponent implements OnInit {

  constructor(private ser :ApiService) { }
  fileName:any;
  imgurl=this.ser.imgURL;
  img_div= false;
  icon_1=true;
  interestItem:any;
  interestList:any[]=[];
  interests:any;
  all_jobs:any;
  count:any=0;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  ngOnInit(): void {
    Aos.init();
    this.all_job_titles();
    this.getuser();
    const target = document.querySelector('.heading1')
    const writer = new Typewriter(target, {
      loop: true,
      typeSpeed: 80,
  deleteSpeed: 80,
  typeColor: '#FECD45'
    })
    writer
    .type('Remote')
    .rest(500)
    .remove(6)
    .type('USA')
    .rest(500)
    .remove(3)  
    .type('On Site')
    .rest(500)
    .remove(8)
    .start()
  }

  
  uploadForm = new FormGroup({
    fname: new FormControl(null,[Validators.required]),
    lname: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    email: new FormControl(null,[Validators.required,Validators.pattern(this.emailPattern)]),
    qualification: new FormControl('',[Validators.required]),
    interest: new FormControl(''),
    description: new FormControl(null),
    document: new FormControl(null,[Validators.required]),

  })
  onsubmit(d:any){
    if(this.uploadForm.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid Information',
      })
      return;
    }else{
    let data = {
      job_seeker_fname: d.fname,
      job_seeker_lname:d.lname,
      job_seeker_phone_number:d.phone,
      job_seeker_country:d.country,
      job_seeker_state:d.state,
      job_seeker_city:d.city,
      job_seeker_address:d.address,
      job_seeker_zipcode:d.zipcode,
      qualification:d.qualification,
      experience:d.experience,
      job_interests:d.interest,
      upload_resume:d.document,
      job_seeker_summary:d.description,
      tbl_job_seeker_id:0
    }
    // console.log(data)
    this.ser.job_seeker_profile_update(data).subscribe(res=>{
      // console.log(res,"jobseeker")
    })
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Resume Uploaded Successfully',
      showConfirmButton: false,
      timer: 1500
    })
  setTimeout(function(){
          window.location.reload()
  },1500)
  }}
  interest(e:any){
    this.interestItem = e.value;
    // console.log(e.value)
    if(this.interestList.includes(e.value)){
      return;
    }
    else{
      this.interestList.push(e.value);
    }
  }
  remove(id:any){
    if (id > -1) {
     this.interestList.splice(id, 1);
     
  }
   }
   onFileSelected(event:any) {
    const file:File = event.target.files[0];
    // console.log('hh', file)
    if (file) {
      this.img_div=true;
        this.fileName = file.name;
        this.icon_1=false
        const formData = new FormData();
        formData.append("thumbnail", file);
        let data={
          input_image:file
        }
        // console.log('aaa',data);
        this.ser.image1(file).subscribe(res=>{
          // console.log('GERE',res);
        })
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
  
  get fname(){
    return this.uploadForm.get('fname')
  }
  get phone(){
    return this.uploadForm.get('phone')
  }
  get email(){
    return this.uploadForm.get('email')
  }
  get qualification(){
    return this.uploadForm.get('qualification')
  }
  get document(){
    return this.uploadForm.get('document')
  }

  getuser() {
    let id = localStorage.getItem('id');
    let data = {
      tbl_user_id: id
    }
    this.ser.get_user_by_id(data).subscribe(res => {
      console.log('RES--------', res);
      if(res=='datanotfound'){
       return
      }
       else{
         this.uploadForm.setValue({
           fname:res.data[0].employer_fname || res.data[0].job_seeker_fname,
           lname: res.data[0].employer_lname || res.data[0].job_seeker_lname,
           phone: res.data[0].employer_phone_number,
           email: res.data[0].email,
           qualification: res.data[0].qualification,
           interest: res.data[0].job_interests,
           description: null,   
           document: res.data[0].upload_resume
         })
    }
      
    })
    
  }
}
