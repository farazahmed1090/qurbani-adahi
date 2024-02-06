import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Aos from 'aos';
import { ApiService } from 'src/service/api.service';
import Swal from 'sweetalert2';
// @ts-ignore
import Typewriter from't-writer.js';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private ser :ApiService) { }
  
  ngOnInit(): void {
    Aos.init();
    this.getuser();
    const target = document.querySelector('.heading1')
    const writer = new Typewriter(target, {
      loop: true,
      typeSpeed: 80,
  deleteSpeed: 80,
  typeColor: '#FECD45'
    })
    writer
    .type('Serve')
    .rest(500)
    .remove(5)
    .type('Provide')
    .rest(500)
    .remove(7)  
    // .type('Benefit')
    // .rest(500)
    // .remove(8) 
    .start()
  }

  Contact_form= new FormGroup({
    fname: new FormControl(null,[Validators.required]),
    lname: new FormControl(null),
    email: new FormControl(null,[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    phone: new FormControl(null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    description: new FormControl(null,[Validators.required]),
})
onsubmit(d:any){
  if(this.Contact_form.invalid){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Enter Valid Information',

    })
      }else{
        let data ={
          fname:d.fname,
          lname:d.lname,
          phone_number:d.phone,
          email:d.email,
          message:d.description
          
        }
        this.ser.contact_us(data).subscribe(res=>{
          console.log(res,'ho gyaa contact')
          
        })
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Thank You For Contacting Us',
          showConfirmButton: false,
          timer: 1500
        })
       
      setTimeout(function(){
              window.location.reload()
      },1500)
      }

}
get fname(){
  return this.Contact_form.get('fname')
}
get email(){
  return this.Contact_form.get('email')
}
get phone(){
  return this.Contact_form.get('phone')
}
get description(){
  return this.Contact_form.get('description')
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
       this.Contact_form.setValue({
         fname:res.data[0].employer_fname || res.data[0].job_seeker_fname,
         lname: res.data[0].employer_lname || res.data[0].job_seeker_lname,
         phone: res.data[0].employer_phone_number,
         email: res.data[0].email,
         description: null,   
       })
  }
    
  })
  
}
}
