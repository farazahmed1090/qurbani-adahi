import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  how_it_works : any = false;
  services : any = false;
  resource : any = false;
  iconActive = this.how_it_works;
  styleOne : any = false;
  styleTwo : any = false;
  styleThree : any = false;
  styleFour : any = false;
  styleFive : any = false;
  styleSix : any = false;
  styleSeven : any = false;
  styleEight :any = false;
  profile : any = false;
  styleEmp:any=false;
  login : any = true;
  href : string = "";
  myData :any;

  constructor(private router : Router ) { }

  ngOnInit(): void {
    this.func2();
    if(localStorage.getItem('id')!=null){
      this.profile=true;
    }
    else{
      this.profile=false;
    }



  }

  
  func2(){
    this.href = this.router.url
    if(this.href == '/find-jobs'){
     this.styleOne = true;
    }
    else    if(this.href == '/'){
      this.styleSix = true;
     }
     else if ( this.href == '/upload-resume'){
    this.styleTwo = true;
    }
    else if ( this.href == '/employer'){
      this.styleThree = true;
      }  
      else if ( this.href =='/alljobseekers'){
        this.styleEight = true;
        }
      else if ( this.href == '/contact-us'){
      this.styleFour = true;
      } 
      else if ( this.href == '/login'){
        this.styleFive = true;
        }
        else if ( this.href == '/home'){
          this.styleSix = true;
          }
          else if ( this.href == '/about-us'){
            this.styleSeven = true;
            }
            else if ( this.href == '/all-employers'){
              this.styleEmp = true;
              }
  }  
     get_data(){
     let  data: any = localStorage.getItem('session');
    
      this.myData = JSON.parse(data); 
      console.log(this.myData)
      if(this.myData.id == 1){
          this.profile = true;
          this.login = false; 
          this.router.navigate(['/']);
          return;
      }
      else if (this.myData.id != 1 ){
        this.router.navigate(['/login'])
      } 
     }

  

  
     logout(){
      Swal.fire({
        title: 'Are you sure you want to logout?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Logout'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
      this.router.navigate(['register']);
        }
      })
     }


 


      

}
