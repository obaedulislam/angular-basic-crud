import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  active = 1;
  userForm: any;
  submitted = false;

  constructor(private fb: FormBuilder, private service: CommonService) {
    this.userForm = this.fb.group({
      yourName: [''],
      email: [''],
      phone: [''],
      age: [''],

    })
  }

  ngOnInit(): void {

  }

  SubmitForm() {
    this.service.AddUser(this.userForm.value).subscribe(data => {
      alert("Added");
      console.log(data);
    })
  }
}
