import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../service/common.service';
import Swal from 'sweetalert2';

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
      id: [null], // or id: [undefined]
      userName: [''],
      email: [''],
      phone: [''],
      age: ['']
    });

  }

  ngOnInit(): void {
    this.GetAllUsers();
  }


  // SubmitForm() {
  //   if (this.userForm.value.userName && this.userForm.value.phone && this.userForm.value.email && this.userForm.value.age) {
  //     const type = this.userForm.value.id ? 'update' : 'add';

  //     this.service.AddUser(this.userForm.value, type).subscribe(data => {
  //       if (type === 'add') {
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'User (' + this.userForm.value.userName + ') Saved successfully',
  //         })
  //       } else {
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'User (' + this.userForm.value.userName + ') Updated successfully',
  //         })
  //       }
  //       this.userForm.reset();
  //       this.GetAllUsers();
  //     });
  //   } else {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Please add user info correctly'
  //     })
  //   }

  // }


  SubmitForm() {
    const isUpdate = !!this.userForm.value.id;

    if (
      this.userForm.value.userName && this.userForm.value.phone && this.userForm.value.email && this.userForm.value.age
    ) {
      const userPayload = {
        ...this.userForm.value,
        id: isUpdate ? this.userForm.value.id : null
      };

      const type = isUpdate ? 'update' : 'add';

      this.service.AddUser(userPayload, type).subscribe(data => {
        if (type === 'add') {
          Swal.fire({
            icon: 'success',
            title: 'User (' + this.userForm.value.userName + ') Saved successfully',
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'User (' + this.userForm.value.userName + ') Updated successfully',
          });
        }
        this.userForm.reset();
        this.GetAllUsers();
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please add user info correctly'
      });
    }
  }



  GetAllUsers() {
    this.service.GetAllUsers().subscribe(data => {
      console.log("users", data);
      this.users = data;
    });
  }


  DeleteConfirmation(id: any) {
    Swal.fire({
      icon: 'warning',
      title: "Do you want to Delete this user?",
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then((result) => {
      if (result.isConfirmed) {
        this.DeleteUserById(id);
      } else if (result.isDenied) {
        Swal.fire("changes are not saved", "", "info");
      }
    });
  }

  DeleteUserById(id: any) {
    this.service.DeleteUserById(id).subscribe(data => {
      Swal.fire("Deleted", "", "success");
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
