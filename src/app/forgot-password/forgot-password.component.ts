import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private ser : ApiService , private http : HttpClient) { }
  responseID:any;
  pass_not_match=false;
  genPass:any;
  Pass_div=true;
  label_pass=true;
  ngOnInit(): void {
    this.gen_random_pass();
  }
 
  fg_pw_form = new FormGroup({
    // email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    email: new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('',Validators.compose([Validators.required, Validators.maxLength(8)])),
    confirmpassword : new FormControl('',Validators.compose([Validators.required, Validators.maxLength(8)]))
  })
  get email() { return this.fg_pw_form.get('email') }
    get password() { return this.fg_pw_form.get('password') }

    validate_pass(){
      if(this.fg_pw_form.controls.password.value != this.fg_pw_form.controls.confirmpassword.value ) 
      {
        this.pass_not_match=true;
      }  else{
        this.pass_not_match=false;
        this.changePassword()
      }
      }

      changePassword(){
        if(this.fg_pw_form.controls.password.value && this.fg_pw_form.controls.confirmpassword.value != '' ){
          this.responseID = localStorage.getItem('responseID');
          let data = {
            tbl_user_id : this.responseID,
            password : this.fg_pw_form.controls.password.value
          }
          console.log(data)
          this.ser.change_password(data).subscribe(res=>{
            console.log(res);
            if(res == "password_change"){
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your Password is Successfully Updated',
                showConfirmButton: false,
                timer: 1500
              })
              setTimeout(function(){
                    window.location.href='/signin'
              },1500)
            }
            else{

              return;
            }
          })
        }
        else{
          
          return;
        }

        

      }
      gen_random_pass(){
        this.genPass=Math.random().toString(36).slice(-9);
       console.log(this.genPass,'mypass')
      
         }
         use_pass(){
          this.Pass_div=false;
          this.label_pass=false;
           this.fg_pw_form.setValue({
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
