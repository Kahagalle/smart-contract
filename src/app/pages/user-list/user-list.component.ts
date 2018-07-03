import { Component, OnInit } from '@angular/core';
import { User } from "../../theme/models/user";
import { MyService } from "../../theme/services/backend/services";

@Component({
  selector: 'app-table-list',
  templateUrl: './user-list.component.html',
  providers: [MyService],
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  userStream: string = "users";

  constructor(private _service: MyService) {
    this.LoadUsers();
   }

  ngOnInit() {
  }


  LoadUsers(){
    this._service.listStreamItems(this.userStream).then(data => {
      console.log(data);
      data.forEach(element => {
        let user: User = JSON.parse(this._service.Hex2String(element.data.toString()));
        user.user_id = element.txid;
        this.users.push(user);
      });
      console.log(this.users);
    }).catch(error => {
      console.log(error.message);
    });
  }

}
