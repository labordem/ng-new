import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;

  isFormSubmitted = false;
  isResetPasswordSucceed = false;
  isResetPasswordFailed = false;

  accountId = 0;
  token = '';
  isPasswordHidden = true;
  errorMessage = '';
  private readonly isDestroyed$ = new Subject<boolean>();

  get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly snackbarService: SnackbarService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.formGroup = this.createFormGroup('change');
  }

  async ngOnInit(): Promise<void> {
    const idFromUrl = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.accountId = idFromUrl === '' ? parseInt(idFromUrl, 10) : 0;
    this.token = this.activatedRoute.snapshot.paramMap.get('token') ?? '';
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

  onSubmit(): Subscription | undefined {
    this.isFormSubmitted = true;
    this.formGroup.disable();
    this.isPasswordHidden = true;

    return this.authService
      .resetPassword$(
        { newPassword: this.f.password?.value as string },
        this.accountId,
        this.token,
      )
      .pipe(
        finalize(() => {
          this.isFormSubmitted = false;
          this.changeDetectorRef.detectChanges();
        }),
        takeUntil(this.isDestroyed$),
      )
      .subscribe(
        (res) => (this.isResetPasswordSucceed = true),
        (err) => {
          this.isResetPasswordFailed = true;
        },
      );
  }

  private createFormGroup(
    updateOn: 'submit' | 'change',
    previousValue?: { [key: string]: unknown },
  ): FormGroup {
    // tslint:disable
    const formGroup = this.formBuilder.group(
      {
        password: [
          null,
          [Validators.required, Validators.pattern(/^.{8,191}$/)],
        ],
        confirmPassword: [null, [Validators.required]],
      },
      {
        updateOn,

        validators: [
          this.mustNotBeRejectedValidator(),
          this.mustMatchValidator('password', 'confirmPassword'),
        ],
      },
      // tslint:enable
    );
    if (previousValue !== undefined) {
      formGroup.setValue(previousValue);
    }

    return formGroup;
  }

  private mustNotBeRejectedValidator(): () => void {
    return () => {
      if (this.errorMessage !== '') {
        this.snackbarService.open(this.errorMessage, 'warn');
      }
      this.errorMessage = '';
    };
  }

  private mustMatchValidator(
    controlName: string,
    matchingControlName: string,
  ): (formGroup: FormGroup) => void {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors !== null &&
        !matchingControl.errors.mustMatch
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      }
      // tslint:disable-next-line: no-null-keyword
      matchingControl.setErrors(null);
    };
  }
}
