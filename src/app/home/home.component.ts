import { Component, OnInit } from '@angular/core';
import * as AOS  from 'aos';
//@ts-ignore
import Typewriter from't-writer.js';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/service/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pro_name=this.ser.project_name;
  userCount:number=0;
  jobsCount:number=0;
  loader=true;
  ng_particles=false;
  quik_links=false;
  home_div=false;
  professionalsCount:number=0;
  all_jobs:any;
  all_city:any;
    constructor(private ser :ApiService, private router: Router) {  
      // debugger;
      setTimeout(() => {
         this.loader = false;
        this.ng_particles=true;
        this.quik_links=true;
        // this.home_div=true
      }, 3000);}
    serach_form = new FormGroup({
    search :  new  FormControl('')
    })
   
    ngOnInit(): void {
      setTimeout(() => {
         this.roll();
      }, 3000);
      AOS.init();
      this.all_job_titles();
      this.all_cities();
    }
    roll(){
      // alert('1')
      const target = document.querySelector('.tw')
      const writer = new Typewriter(target, {
        loop: true,
        typeSpeed: 80,
    deleteSpeed: 80,
    typeColor: '#FECD45'
      })
      writer
      .type('right')
      .rest(500)
      .remove(5)
      .type('perfect')
      .rest(500)
      .remove(7)   
      .start()
    }
  userCountStop:any= setInterval(()=>{
    this.userCount++;
    if(this.userCount== 100){
      clearInterval(this.userCountStop);
    }
  },20)
  professionalsCountStop:any= setInterval(()=>{
    this.jobsCount++;
    if(this.jobsCount== 450){
      clearInterval(this.professionalsCountStop);
    }
  },10)
  jobsCountStop:any= setInterval(()=>{
    this.professionalsCount++;
    if(this.professionalsCount== 300){
      clearInterval(this.jobsCountStop);
    }
  },10)
  onsubmit(d:any){
    localStorage.setItem('job-key',d)
    // window.location.href='/find-jobs';
    this.router.navigate(['/find-jobs']);
    }

    all_job_titles(){
      this.ser.all_job_titles().subscribe(res=>{
        console.log('job',res)
      this.all_jobs=[];
      let res1:any=res;
      for(let i=0; i<res1.length;i++){
        this.all_jobs.push(res1[i]);
      }
      })
        }
    all_cities(){
      this.ser.get_all_cities().subscribe(res=>{
        // console.log('cities',res)
      this.all_city=[];
      let res1:any=res;
      for(let i=0; i < res1.length;i++){
      this.all_city.push(res1[i]);
    }
    console.log(this.all_city,'All Cities')
      })
        }

}
