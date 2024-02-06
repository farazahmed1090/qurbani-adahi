import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quick-link',
  templateUrl: './quick-link.component.html',
  styleUrls: ['./quick-link.component.css'],
})
export class QuickLinkComponent implements OnInit {
  fileName: any;
  imgurl = this.ser.imgURL;
  img_div = false;
  icon_1 = true;
  form_div = false;

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(private ser: ApiService) {}

  uploadForm = new FormGroup({
    fname: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),]),
    description: new FormControl(null),
    document: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.get_user_by_id();
  }
  Hide_show() {
    this.form_div = !this.form_div;
  }
  get_user_by_id() {
    let id = localStorage.getItem('id');
    let data = {
      tbl_user_id: id,
    };
    this.ser.get_user_by_id(data).subscribe((res) => {
      console.log(res, 'user aa gaya ');
      if (res == 'datanotfound') {
        return;
      } else {
        this.uploadForm.patchValue({
          email: res.data[0].email,
        });
      }
    });
  }

  onsubmit(d: any) {
    console.log(d);

    if (this.uploadForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid Information',
      });
      return;
    } else {
      let data = {
        job_seeker_fname: d.fname,
        job_seeker_email:d.email,
        job_seeker_summary: d.description,
        uploaded_resume: d.document,
        tbl_user_id: localStorage.getItem('id'),
      };
      this.ser.job_seeker_upload_resume(data).subscribe((res) => {
        console.log(res);
      });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Resume Uploaded Successfully',
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(function () {
        window.location.reload();
      }, 1500);
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.img_div = true;
      this.fileName = file.name;
      this.icon_1 = false;
      const formData = new FormData();
      formData.append('thumbnail', file);
      let data = {
        input_image: file,
      };
      // console.log('aaa',data);
      this.ser.image1(file).subscribe((res) => {
        console.log('GERE', res);
      });
    }
  }
  get fname() {
    return this.uploadForm.get('fname');
  }
  get email() {
    return this.uploadForm.get('email');
  }
  get document() {
    return this.uploadForm.get('document');
  }
}
