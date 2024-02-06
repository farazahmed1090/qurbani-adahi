import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
//@ts-ignore
import Typewriter from't-writer.js';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    Aos.init();
    const target = document.querySelector('.heading1')
      const writer = new Typewriter(target, {
        loop: true,
        typeSpeed: 80,
    deleteSpeed: 80,
    typeColor: '#FECD45'
      })
      writer
      .type('Global')
      .rest(500)
      .remove(6)
      .type('Worldwide')
      .rest(500)
      .remove(9)  
      .type('Comprehensive')
      .rest(500)
      .remove(14) 
      .start()
  }

}
