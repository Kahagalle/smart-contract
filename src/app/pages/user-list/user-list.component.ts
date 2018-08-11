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
  userStream: string = "user";

  constructor(private _service: MyService) { 
    console.log("user list");
    this.LoadUsers();
  }

  ngOnInit() {
  }


  LoadUsers(){
    this._service.listStreamItems(this.userStream).then(data => {
      data.forEach(element => {
        console.log(element);
        console.log(element);
        if(element.index == 1){
          return;
        }
        let user: User = JSON.parse(this._service.Hex2String(element.data.toString()));
        console.log(user);
        user.user_id = element.txid;
        this.users.push(user);
      });
      console.log(this.users);
    }).catch(error => {
      console.log(error.message);
    });
  }

}
