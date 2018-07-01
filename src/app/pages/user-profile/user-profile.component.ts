import { Component, OnInit } from '@angular/core';
import { MyService } from "../../theme/services/backend/services";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  ChainInfo = null;

  constructor(private _service: MyService,) { 
    console.log("user profile");
    _service.getinfo().then(data => {
        console.log(data);
        this.ChainInfo = data;
    }).catch(error => {
        console.log(error.message);
    });
  }

  ngOnInit() {

    console.log("user profile1");
    console.log("user profile2");
  }

}
