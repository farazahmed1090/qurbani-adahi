import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private ser : ApiService , private router : Router, ) { }
  pass_not_match=false;
  email_exist:any=false;
  genPass:any;
  Pass_div=true;
  label_pass=true;
  ngOnInit(): void {
    this.gen_random_pass()
  }

register_form = new FormGroup({
  email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  
  password: new FormControl('',Validators.compose([Validators.required, Validators.minLength(8)])),
  confirmpassword : new FormControl('',Validators.compose([Validators.required, Validators.minLength(8)]))
})
get email() { return this.register_form.get('email') }
  get password() { return this.register_form.get('password') }
  get c_password() { return this.register_form.get('confirmpassword') }


  validate_pass(){
if(this.register_form.controls.password.value != this.register_form.controls.confirmpassword.value ) 
{
  this.pass_not_match=true;
}  else{
  this.pass_not_match=false;
}
}

submit(e : any ){
  if(this.register_form.invalid){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Pls fill all required fileds!',
    })
    return
  }
  let data = {
   employer_email : e.email,
   employer_password : e.password
  }
  this.ser.employer_signup(data).subscribe(res => {
    console.log(res, 'Im signup')
    if(res == 'email_already_exists'){
this.email_exist=true;
    } else{
this.email_exist=false;
     Swal.fire({
      title: 'Thank you! Mr.' + this.register_form.controls.email.value + '.',
      text: "We request you to verify your email by clicking the validation link below:",
      confirmButtonColor: '#282871',
      confirmButtonText: 'Click here to validate link.'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(res)
        localStorage.setItem("id",res);
        console.log(localStorage)
        window.location.href='https://mail.google.com/mail/u/0/?tab=km#inbox';
      }
      else{

      }
    })

    }
  })
 }

 gen_random_pass(){
  this.genPass=Math.random().toString(36).slice(-9);
 console.log(this.genPass,'mypass')

   }
   use_pass(){
    this.Pass_div=false;
    this.label_pass=false;
     this.register_form.setValue({
   password: this.genPass,
   email: null,
   confirmpassword:this.genPass
 
  })

   }
   close(){
    this.Pass_div=false;
    this.label_pass=false;
   }
}
