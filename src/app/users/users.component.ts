import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  active = 1;
  userForm: any;
  submitted = false;

  constructor(private fb: FormBuilder) {
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
    this.submitted = true;
    console.log(this.userForm.value);
  }
}
