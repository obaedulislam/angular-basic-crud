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
  users: any;

  constructor(private fb: FormBuilder, private service: CommonService) {
    this.userForm = this.fb.group({
      id: [''], // Add id field
      userName: [''],
      email: [''],
      phone: [''],
      age: ['']
    });
  }

  ngOnInit(): void {
    this.GetAllUsers();
  }

  SubmitForm() {
    const type = this.userForm.value.id ? 'update' : 'add';

    this.service.AddUser(this.userForm.value, type).subscribe(data => {
      if (type === 'add') {
        alert('Added');
      } else {
        alert('Updated');
      }
      this.userForm.reset();
      this.GetAllUsers();
    });
  }

  GetAllUsers() {
    this.service.GetAllUsers().subscribe(data => {
      console.log("users", data);
      this.users = data;
    });
  }

  DeleteUserById(id: any) {
    this.service.DeleteUserById(id).subscribe(data => {
      alert("User deleted");
      this.GetAllUsers();
    });
  }

  GetUserById(id: any) {
    this.service.GetUserById(id).subscribe(data => {
      alert("Single user get successfully");
      console.log("user detail", data);

      this.userForm.patchValue({
        id: data.id,
        userName: data.userName,
        email: data.email,
        phone: data.phone,
        age: data.age
      });

      this.active = 1;
    });
  }
}
