import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AccessLinkComponent } from './access-link/access-link.component';
import { AllAmployersComponent } from './all-amployers/all-amployers.component';
import { AllJobSeekersComponent } from './all-job-seekers/all-job-seekers.component';
import { BlogsComponent } from './blogs/blogs.component';
import { CompanySectionComponent } from './company-section/company-section.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { EmployerComponent } from './employer/employer.component';
import { FeaturedJobSecComponent } from './featured-job-sec/featured-job-sec.component';
import { FindJobsComponent } from './find-jobs/find-jobs.component';
import { FooterComponent } from './footer/footer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LastSecComponent } from './last-sec/last-sec.component';
import { ProfileComponent } from './profile/profile.component';
import { QuickLinkComponent } from './quick-link/quick-link.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { TestimonialsSectionComponent } from './testimonials-section/testimonials-section.component';
import { UploadResumeComponent } from './upload-resume/upload-resume.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'contact-us',component:ContactUsComponent},
  {path:'employer', component:EmployerComponent},
  {path:'upload-resume', component:UploadResumeComponent},
  {path:'find-jobs', component:FindJobsComponent},
  {path:'blogs', component:BlogsComponent},
  {path:'home', component:HomeComponent},
  {path:'footer', component:FooterComponent},
  {path:'header', component:HeaderComponent},
  {path:'profile', component:ProfileComponent},
  {path:'signin', component:SigninComponent},
  {path:'register', component:RegisterComponent},
  {path:'about-us', component:AboutUsComponent},
  {path: 'all-employers', component: AllAmployersComponent},
  {path:'alljobseekers', component:AllJobSeekersComponent},
  {path:'forgot-password', component:ForgotPasswordComponent},
  {path:'access-link', component:AccessLinkComponent},
  {path:'testimonials', component:TestimonialsSectionComponent},
  {path:'company-sec', component:CompanySectionComponent},
  {path:'featured-sec', component:FeaturedJobSecComponent},
  {path:'last-sec', component:LastSecComponent},
  {path:'quick-link', component:QuickLinkComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
