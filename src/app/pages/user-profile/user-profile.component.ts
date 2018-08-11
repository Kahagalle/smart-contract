import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MyService } from "../../theme/services/backend/services";
import { Router, Params, ActivatedRoute } from '@angular/router';
declare var require: any;
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { User } from "../../theme/models/user";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  providers: [MyService],
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  ChainInfo = null;
  @Input() user: User;
  public form: FormGroup;
  public username: AbstractControl;
  public email: AbstractControl;
  userStream: string = "user";


  constructor(fb: FormBuilder,private _service: MyService,private _route: ActivatedRoute, private _router: Router) { 
    console.log("user profile");
    _service.getinfo().then(data => {
      console.log(data);
  }).catch(error => {
      console.log(error.message);
  });

  
  _service.getaddresses().then(data => {
    console.log(data);
}).catch(error => {
    console.log("error.message");
});
this.user = new User();
this.form = fb.group({
  'username': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
  'email': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
});
this.username = this.form.controls['username'];
this.email = this.form.controls['email'];
  }

  ngOnInit() {
  }

  public onUserSubmit(values: Object): void {
    console.log("submitted");
    console.log(values);
    console.log(this.user);
    console.log(values);
    let key = this.user.username;
    let userJSON = JSON.stringify(this.user);
    console.log(userJSON);

    let data_hex = this._service.String2Hex(userJSON);
    console.log(data_hex);
    // console.log(this.Hex2String(data_hex));  

    this._service.publishToStream(this.userStream, key, data_hex).then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error.message);
    });

    this._router.navigate(['user-list']);
   // location.reload();
  }

}
