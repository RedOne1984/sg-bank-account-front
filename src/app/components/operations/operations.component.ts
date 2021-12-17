import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {OperationsService} from '../../service/operations.service';
import {Account} from '../../model/account.model';
import {AccountService} from '../../service/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html'
})
export class OperationsComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  loading = false;
  accounts: Account[];
  showMessage = false;
  constructor(private formBuilder: FormBuilder, private operationsService: OperationsService,
              private accountService: AccountService, private router: Router) {
    this.form = this.formBuilder.group({
      account: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  get f(): any { return this.form.controls; }

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(data => {
      this.accounts = data;
    });
  }

  deposit(): void {
    this.operationsService.postOperation(this.f.account.value, Number(this.f.amount.value))
      .pipe(first())
      .subscribe(
        data => {
          this.showMessage = true;
        },
        error => {
          this.loading = false;
        });
  }

  withdrawal(): void {
    this.operationsService.postOperation(this.f.account.value, -Number(this.f.amount.value))
      .pipe(first())
      .subscribe(
        data => {
          this.showMessage = true;
        },
        error => {
          this.loading = false;
        });
  }

  disableButton(): boolean {
    return this.loading || (!this.f.account.value || !this.f.amount.value);
  }

  goToHistory(): void {
    this.router.navigate(['history']);
  }
}
