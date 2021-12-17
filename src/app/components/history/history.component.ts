import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Account} from '../../model/account.model';
import {OperationsService} from '../../service/operations.service';
import {AccountService} from '../../service/account.service';
import {Operation} from '../../model/operation.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  loading = false;
  accounts: Account[];
  operations: Operation[] = [];
  constructor(private formBuilder: FormBuilder, private operationsService: OperationsService,
              private accountService: AccountService, private router: Router) {
    this.form = this.formBuilder.group({
      account: ['']
    });
  }

  get f(): any { return this.form.controls; }

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(data => {
      this.accounts = data;
    });
  }

  loadOperationsHistory(): void {
    this.operationsService.getOperationByAccount(this.f.account.value).subscribe(data => {
      this.operations = data;
    });
  }

  newOperation(): void {
    this.router.navigate(['operations']);
  }
}
