import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
//@ts-ignore
import Typewriter from't-writer.js';

@Component({
  selector: 'app-all-amployers',
  templateUrl: './all-amployers.component.html',
  styleUrls: ['./all-amployers.component.css']
})
export class AllAmployersComponent implements OnInit {


  constructor() { }
  activebg = '#FECD45'
  activefont= '#000'

  defaultbg = '';
  defaultfont = '';

  adminbg ='#FECD45';
  adminfont = '#000';

  itbg = this.defaultbg
  itfont = this.defaultfont

  payrollbg = this.defaultbg
  payrollfont = this.defaultfont

  vmsbg = this.defaultbg;
  vmsfont = this.defaultfont;

  admin : any = true;
  it : any = false;
  payroll : any = false;
  vms : any = false;

  ngOnInit(): void {
    Aos.init()
    const target = document.querySelector('.tw')
    const writer = new Typewriter(target, {
      loop: true,
      typeSpeed: 80,
  deleteSpeed: 80,
  typeColor: '#FECD45'
    })
    writer
    .type('Assist')
    .rest(500)
    .remove(6)
    .type('Serve')
    .rest(500)
    .remove(5) 
    .type('HERE')
    .rest(500)
    .remove(4)     
    .start()
  
 
  }

  get_id(e : any){
     let id = e.currentTarget.id;
   if( id == 'admin'){
    this.admin = true;
    this.it = false;
    this.payroll =  false;
    this.vms =  false;

    this.adminbg ='#FECD45';
    this.adminfont = '#000';

   this.itbg = this.defaultbg
   this.itfont = this.defaultfont
  
   this.payrollbg = this.defaultbg
   this.payrollfont = this.defaultfont
  
   this.vmsbg = this.defaultbg;
   this.vmsfont = this.defaultfont;

    console.log(id)
   }
   else if( id == 'it'){
    this.it =  true;
    this.admin = false;
    this.payroll = false;
    this.vms = false;
    console.log(id)

    this.adminbg =this.defaultbg
    this.adminfont = this.defaultfont

   this.itbg = this.activebg
   this.itfont = this.activefont
  
   this.payrollbg = this.defaultbg
   this.payrollfont = this.defaultfont
  
   this.vmsbg = this.defaultbg;
   this.vmsfont = this.defaultfont;
   }
   else if( id == 'payroll'){
    this.payroll = true;
    this.it =  false;
    this.admin = false;
    this.vms = false;
    console.log(id)
    this.adminbg =this.defaultbg
    this.adminfont = this.defaultfont

   this.itbg = this.defaultbg
   this.itfont = this.defaultfont
  
   this.payrollbg = this.activebg
   this.payrollfont = this.activefont
  
   this.vmsbg = this.defaultbg;
   this.vmsfont = this.defaultfont;
    
   }
   else if( id == 'vms'){
    this.it =  false;
    this.admin = false;
    this.payroll = false;
    this.vms =  true;
    console.log(id)
    this.adminbg =this.defaultbg
    this.adminfont = this.defaultfont

   this.itbg = this.defaultbg
   this.itfont = this.defaultfont
  
   this.payrollbg = this.defaultbg;
   this.payrollfont = this.defaultfont;
  
   this.vmsbg = this.activebg;
   this.vmsfont = this.activefont;
   }
  }

}
