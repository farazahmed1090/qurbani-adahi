import { Component, OnInit } from '@angular/core';
import { MoveDirection, ClickMode, HoverMode, OutMode } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import {Container, Engine, Main} from "tsparticles-engine";

@Component({
  selector: 'app-particle',
  templateUrl: './particle.component.html',
  styleUrls: ['./particle.component.css']
})
export class ParticleComponent implements OnInit {
    id = "tsparticles";

  
    /* or the classic JavaScript object */
    particlesOptions = {
      //   background: {
      //       color: {
      //           value: "#282871",
      //       },
    //},
        fpsLimit: 40,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: ClickMode.push,
                },
                onHover: {
                    enable: true,
                    mode: HoverMode.repulse,
                },
                resize: true,
            },
            modes: {
              // bubble: { distance: 400, duration: 2, opacity: 0.8, size: 40, speed: 3 },
              push: {
                    quantity: 4,
                },
                remove:{
                    quantity : 2,
                },
                repulse: {
                    distance: 150,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: "#FECD45",
            },
            links: {
                color: "#FECD45",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 0.8,
            },
            FullScreen:{
              enable: false
            },
            collisions: {
                enable: true,
            },
            move: {
                direction: MoveDirection.none,
                enable: true,
                outModes: {
                    default: OutMode.out,
                },
                random: false,
                speed: 1,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 80,
            },
            opacity: {
                value: 0.3,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 3 },
            },
        },
        detectRetina: true,
    };
  
    particlesLoaded(container: Container): void {
        console.log(container);
    }
  
    async particlesInit(engine: Engine): Promise<void> {
        console.log(engine);
  
        await loadFull(engine);
    }

  constructor() { }

  ngOnInit(): void {
  }

}
