import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MyService } from "../../theme/services/backend/services";

import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Contract } from "../../theme/models/contract";

@Component({
  selector: 'app-typography',
  templateUrl: './contracts.component.html',
  providers: [MyService],
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {
  contractStream: string = "contracts";
  @Input() contract: Contract;
  public form: FormGroup;
  public name: AbstractControl;
  contracts: Contract[] = [];

  constructor(fb: FormBuilder,private _service: MyService) {
    console.log("user contract");
    this.contract = new Contract();
    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
    });
    this.name = this.form.controls['name'];
    this.LoadContracts();
   }

  ngOnInit() {
  }

  public onContractSubmit(values: Object): void {
    console.log("submitted");
    console.log(values);
    console.log(this.contract);
    console.log(values);
    let key = this.contract.name;
    let userJSON = JSON.stringify(this.contract);
    console.log(userJSON);

    let data_hex = this._service.String2Hex(userJSON);
    console.log(data_hex);
    // console.log(this.Hex2String(data_hex));  

    this._service.publishToStream(this.contractStream, key, data_hex).then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error.message);
    });

    //this._router.navigate(['pages/admin/skill']);
    //location.reload();
  }

  LoadContracts(){
    this._service.listStreamItems(this.contractStream).then(data => {
      data.forEach(element => {
        let contract: Contract = JSON.parse(this._service.Hex2String(element.data.toString()));
        contract.contract_id = element.txid;
        this.contracts.push(contract);
      });
      console.log(this.contracts);
    }).catch(error => {
      console.log(error.message);
    });
  }

}
