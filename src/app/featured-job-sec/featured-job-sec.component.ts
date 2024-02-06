import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';

@Component({
  selector: 'app-featured-job-sec',
  templateUrl: './featured-job-sec.component.html',
  styleUrls: ['./featured-job-sec.component.css']
})
export class FeaturedJobSecComponent implements OnInit {

  constructor() { }


  userCount:number=0;
  jobsCount:number=0;
  professionalsCount:number=0;

  ngOnInit(): void {
    Aos.init()
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
}
