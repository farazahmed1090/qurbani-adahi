import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  applied : any = false;
  info : any = true;
  posts : any = false;
  post_li : any = false;
  applied_li :any = false;
  active_font_color :any = '#2568fb';
  default_font_color : any;
  fontColor1 : any = '#2568fb';
  fontColor2 : any;
  fontColor3 : any;
  myArray :any [] = [];
  myArray2 :any [] = [];
  myArray3 : any [] = [];
  myArray4 : any [] = [];
  id : any ;
  local_id : any;
  employName : any;
  JobSeekerName : any;
  img_div : any;
  fileName : any;
  icon_1 : any = true;
  imgurl : any = this.ser.imgURL;
  p: number = 1;
  totallength:number=0;
  hidePagination = true;
  my_time_stamp : any;


  
  // #f8f9fa Bootstrap bg light..


  constructor(private ser : ApiService , private  http : HttpClient) { }

  edit_profile = new FormGroup({
    fname : new FormControl(null,[Validators.required, ]),
    lname : new FormControl(null,[Validators.required, ]),
    email : new FormControl(null,[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]),
    id : new FormControl(null,[Validators.required, ]),
    resume : new FormControl(null,[Validators.required, ]),
    password : new FormControl(null,[Validators.required, ]),
    phone_number : new FormControl(null,[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$") ]),
    country : new FormControl(null,[Validators.required,]),
    state : new FormControl(null,[Validators.required, ]),
    city : new FormControl(null,[Validators.required, ]),
    address : new FormControl(null,[Validators.required, ]),
    summary : new FormControl(null,[Validators.required,]),
    qualification : new FormControl(null,[Validators.required,]),
    experience : new FormControl(null,[Validators.required, ]),
    zip_code : new FormControl(null,[Validators.required, ]),
    interests : new FormControl(null,[Validators.required, ]),
    status : new FormControl(null,[Validators.required, ]),
    time_stamp : new FormControl(null,[Validators.required,]),
  })



  ngOnInit(): void {
    this.all_empolyees_data()
    this.get_user_by_id()
    this.all_jobs_of_employer()
    this.apllied_jobs_job_seekers()
 }


 all_jobs_of_employer(){
  let data = {
    tbl_user_id : localStorage.getItem('id')
  }
  this.ser.all_jobs_of_employer(data).subscribe(res =>{
    console.log(res, 'job posted by employer')
    let data : any = res;
    if(res=='datanotfound'){
      this.hidePagination=false;
    }else{
       for(let i = 0; i < data.length; i++){
      this.myArray3.push(data[i]);
    }
    }
  })
 }

 get_user_by_id(){
  
  let data = {
    tbl_user_id: localStorage.getItem('id')
  }
  this.ser.get_user_by_id(data).subscribe(res =>{
    console.log(res, "user by id")
    let data: any = res.data;
      this.id = res.data[0].tbl_job_seeker_id;
      console.log(this.id)
    for(let i = 0; i < data.length; i++){
      this.myArray2.push(data[i]);
    }
    console.log('data on behalf of id', this.myArray2)
     this.employName = this.myArray2[0].employer_fname
     this.JobSeekerName = this.myArray2[0].job_seeker_fname

    if (this.myArray2[0].employer_fname != null){
      this.post_li = true; 
      return
    } 
    if(this.myArray2[0].job_seeker_fname != null){
      this.applied_li = true;
      return;
    }
    
  })
 }


 all_empolyees_data(){
  this.ser.get_all_job_seekers().subscribe( res => {
    // console.log(res, "show all data");
    let data: any = res;
      this.id = res[0].tbl_job_seeker_id;
    for(let i = 0; i < data.length; i++){
      this.myArray.push(data[i]);
    }
    console.log('data in my array', this.myArray)

  })
}
 
edit_job_seeker(){
   let data = {
    tbl_user_id : localStorage.getItem('id')
   }
  //  this.ser.get_job_seeker_by_id(data).subscribe(res =>{
  //   console.log(res, "Job seeker by Id")
    this.ser.get_user_by_id(data).subscribe(res =>{
      console.log(res, "Job seeker by Id")
   
   this.edit_profile.setValue({
    // fname: res[0].job_seeker_fname,
    // lname: res[0].job_seeker_lname,
    // email:  null,
    // id : res[0].tbl_job_seeker_id,
    // resume : res[0].upload_resume,
    // password : null,
    // phone_number : res[0].job_seeker_phone_number,
    // country :res[0].job_seeker_country,
    // state :res[0].job_seeker_state,
    // city : res[0].job_seeker_city,
    // address : res[0].job_seeker_address,
    // summary : res[0].job_seeker_summary,
    // qualification : res[0].qualification,
    // experience :res[0].experience,
    // zip_code :res[0].job_seeker_zipcode,
    // interests :res[0].job_interests,
    // status :null,
    // time_stamp :null,
    fname: res.data[0].employer_fname ,
    lname: res.data[0].job_seeker_lname ,
    email:  null,
    id : res.data[0].tbl_user_id,
    resume : res.data[0].upload_resume,
    password : null,
    phone_number : res.data[0].job_seeker_phone_number ,
    country :res.data[0].job_seeker_country ,
    state :res.data[0].job_seeker_state ,
    city : res.data[0].job_seeker_city ,
    address : res.data[0].job_seeker_address ,
    summary : res.data[0].job_seeker_summary ,
    qualification : res.data[0].qualification ,
    experience :res.data[0].experience ,
    zip_code :res.data[0].job_seeker_zipcode ,
    interests :res.data[0].job_interests ,
    status :null,
    time_stamp :null,
   })

   })
}


apllied_jobs_job_seekers(){

  let data = {
    tbl_user_id : localStorage.getItem('id')
  }
  this.ser.job_seeker_all_applied_jobs(data).subscribe(res =>{
    // console.log(res,'jobs apllied by job seekersssssss');
    let data : any = res;
    if(res=='datanotfound'){
      this.hidePagination=false;
    }else{
      for(let i = 0; i < data.length; i++){
        this.myArray4.push(data[i]);
      }
    }
   
    console.log('my array 4', this.myArray4)
     this.my_time_stamp = this.myArray4[0].applied_timestamp.split(' ')
    // console.log(time_stamp,"time stamp array")
    // console.log(this.my_time_stamp)

  })

}


 show_posts(e : any){
    let id = e.target.id;
    if(id == "info"){
      this.info = true;
      this.posts= false;
      this.applied = false;
      this.fontColor1 = this.active_font_color;
      this.fontColor2 = this.default_font_color;
       this.fontColor3 = this.default_font_color;
      //  this.hidePagination =false;
    }

      if( id == "applied"){
      this.info = false;
      this.applied = true; 
      this.posts = false;
      this.fontColor2 = this.active_font_color;
      this.fontColor1 = this.default_font_color;
      this.fontColor3 = this.default_font_color;

     
      
    }

    if(id == "posts"){
       this.info = false;
       this.applied = false;
       this.posts = true; 
       this.fontColor3 = this.active_font_color;
       this.fontColor1 = this.default_font_color;
       this.fontColor2 = this.default_font_color;
      //  this.hidePagination = false;

    }
  }

  submit(e : any){
     let data = {
      job_seeker_fname: e.fname,
      job_seeker_lname: e.lname,
      job_seeker_phone_number : e.phone_number,
      job_seeker_country: e.country,
      job_seeker_state: e.state,
      job_seeker_city: e.city,
      job_seeker_address: e.address ,
      job_seeker_zipcode: e.zip_code ,
      qualification: e.qualification ,
      experience: e.experience ,
      job_interests: e.interests ,
      upload_resume: e.resume ,
      job_seeker_summary: e.summary ,
      tbl_user_id: e.id ,
     }

     this.ser.job_seeker_profile_update(data).subscribe(res=>{
      console.log(res,"I'm Updated")
      console.log(data)
      // window.location.reload()
     })
  }

  get_city_state_by_zipcode(){
    let zipcode = this.edit_profile.value['zip_code']
    let data = {
     zipcode :zipcode
    }
     this.ser.get_city_state_by_zipcode(data).subscribe(res=>{
      console.log('ZIP', res)
  
       this.edit_profile.patchValue({
         city: res[0].city_name,
         state: res[0].state_name
       })
     })
   }

   onFileSelected(event:any) {
    const file:File = event.target.files[0];
    console.log('hh', file)
    if (file) {
      this.img_div=true;
        this.fileName = file.name;
        this.icon_1=false
        const formData = new FormData();
        formData.append("thumbnail", file);
        let data={
          input_image:file
        }
        console.log('aaa',data);
        this.ser.image1(file).subscribe(res=>{
          console.log('GERE',res);
        })
    }
}

  get fname() { return this.edit_profile.get('fname') }
  get lname() { return this.edit_profile.get('lname') }
  get phone_number() { return this.edit_profile.get('phone_number') }
  get zip_code() { return this.edit_profile.get('zip_code') }
  get city() { return this.edit_profile.get('city') }
  get country() { return this.edit_profile.get('country') }
  get state() { return this.edit_profile.get('state') }
  get address() { return this.edit_profile.get('address') }
  get password() { return this.edit_profile.get('password')}
  get qualification() { return this.edit_profile.get('qualification')}
  get summary() { return this.edit_profile.get('summary')}
  get experience() { return this.edit_profile.get('experience')}
  get interests() { return this.edit_profile.get('interests')}
  get status() { return this.edit_profile.get('status')}
  get time_stamp() { return this.edit_profile.get('time_stamp')}
  get email() { return this.edit_profile.get('email')}

  

}
