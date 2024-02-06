import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-testimonials-section',
  templateUrl: './testimonials-section.component.html',
  styleUrls: ['./testimonials-section.component.css']
})
export class TestimonialsSectionComponent implements OnInit {

  constructor(private ser : ApiService) { }
img_path:any=this.ser.imgURL;
pro_name=this.ser.project_name;
all_testimonials:any;
  ngOnInit(): void {
    Aos.init()
    this.get_all_testimonials();
  }
  companyOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="bx bx-chevron-left"></i>', '<i class="bx bx-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }
 
 get_all_testimonials(){
  this.ser.get_all_testimonails().subscribe(res=>{
    console.log('testimonials 1',res)
    if(res=='datanotfound'){
      return
    }else{
      let res1:any=res;
      this.all_testimonials=[];
    for(let i = 0; i < res1.length;i++){
      this.all_testimonials.push(res1[i]);
    }
    console.log(this.all_testimonials,'test')
    }
    
  })
    }

}
