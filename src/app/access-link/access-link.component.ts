import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-access-link',
  templateUrl: './access-link.component.html',
  styleUrls: ['./access-link.component.css']
})
export class AccessLinkComponent implements OnInit {

  constructor(private ser : ApiService , private http : HttpClient) { }
  notExist = false;
  notExisting = ""
  ngOnInit(): void {
  }

  acc_link_form = new FormGroup({

    email: new FormControl('',Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])),
   
  })
  get email() { return this.acc_link_form.get('email')

  
 }

 checkEmail(){
  console.log(this.acc_link_form.valid)
  if(this.acc_link_form.valid){
    this.notExist = false

    let data = {
      email : this.acc_link_form.controls['email'].value
  
    }
    console.log(data)
    this.ser.forgot_password(data).subscribe(res =>{
      console.log(res)
      if(res == "email_not_register"){
        this.notExist = true
        this.notExisting = "Account Not Found"
        
      }
      else{
        localStorage.setItem('responseID',res)
        Swal.fire({
          title: 'Thank you! ',
          text: "We request you to verify your email by clicking the validation link below:",
          confirmButtonColor: '#282871',
          confirmButtonText: 'Click here to validate link.'
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(res)
            localStorage.setItem("responseID",res);
            console.log(localStorage)
            window.location.href='https://mail.google.com/mail/u/0/?tab=km#inbox';
          }
          
        })
      }
    })
  }
  else if(!this.acc_link_form.valid){
    this.notExist = true;
    this.notExisting = "Invalid Email"
    return;
  }

}

}
