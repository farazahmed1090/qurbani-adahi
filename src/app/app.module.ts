import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { UploadResumeComponent } from './upload-resume/upload-resume.component';
import { FindJobsComponent } from './find-jobs/find-jobs.component';
import { BlogsComponent } from './blogs/blogs.component';
import { EmployerComponent } from './employer/employer.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AllJobSeekersComponent } from './all-job-seekers/all-job-seekers.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AccessLinkComponent } from './access-link/access-link.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TestimonialsSectionComponent } from './testimonials-section/testimonials-section.component';
import { CompanySectionComponent } from './company-section/company-section.component';
import { FeaturedJobSecComponent } from './featured-job-sec/featured-job-sec.component';
import { LastSecComponent } from './last-sec/last-sec.component';
import { NgParticlesModule } from 'ng-particles';
import { NgxPaginationModule } from 'ngx-pagination';
import { ParticleComponent } from './particle/particle.component';
import { QuickLinkComponent } from './quick-link/quick-link.component';
import { AllAmployersComponent } from './all-amployers/all-amployers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {Typewriter}  from'/t-writer.js'


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ContactUsComponent,
        UploadResumeComponent,
        FindJobsComponent,
        BlogsComponent,
        EmployerComponent,
        FooterComponent,
        HeaderComponent,
        ProfileComponent,
        SigninComponent,
        RegisterComponent,
        AboutUsComponent,
        AllJobSeekersComponent,
        ForgotPasswordComponent,
        AccessLinkComponent,
        TestimonialsSectionComponent,
        CompanySectionComponent,
        FeaturedJobSecComponent,
        LastSecComponent,
        ParticleComponent,
          QuickLinkComponent,
          AllAmployersComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
  
    BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CarouselModule,
        NgParticlesModule,
        BrowserAnimationsModule,
        NgxPaginationModule
        // Typewriter
        
    ]
    
})
export class AppModule { }
 