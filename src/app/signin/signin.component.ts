import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  // err : any = false;
  showPassword=false
  
  constructor(private ser: ApiService, private router: Router) { }
  ngOnInit(): void {
    this.onload();
 
  }



  signup_form = new FormGroup({
    email: new FormControl(null, Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  })

  onload() {
    let data = {
      tbl_user_id: localStorage.getItem('id')
    }
    console.log('data', data);
    this.ser.get_employer_by_id(data).subscribe(res => {
      console.log(res, 'get employer by id');
      this.signup_form.setValue({
        email: res[0].email,
        password: res[0].password
      })
    })
  }

  user_login(e: any) {
    if(this.signup_form.invalid)
    {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Credentials',
      })
      return
    }
    else {
       let data: any = {
      employer_email: e.email,
      employer_password: e.password
    }
    this.ser.employer_login(data).subscribe(res => {
      console.log(res, 'employer login status')
if(res!='email_and_password_invalid'){
  localStorage.setItem('id', res[0].tbl_user_id);
  this.router.navigate(['/home']);
}
else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
  })
}

    })
    }
  }
  get email() { return this.signup_form.get('email') }
  get password() { return this.signup_form.get('password') }
  get f() {
    return this.signup_form.controls;
 
  }

 


















}
