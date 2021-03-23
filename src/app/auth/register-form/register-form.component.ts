import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ApiError } from 'src/app/core/models/error.model';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

import { AuthError } from '../auth.model';
import { AuthService } from '../auth.service';
import { ConfirmEmailDialogComponent } from '../confirm-email-dialog/confirm-email-dialog.component';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent implements OnInit, OnDestroy {
  @Output() readonly errorHappens = new EventEmitter<string>();
  formGroup: FormGroup;
  isLoading = false;
  isPasswordHidden = true;
  errorMessage = '';
  private readonly isDestroyed$ = new Subject<boolean>();

  get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService,
    private readonly dialog: MatDialog,
  ) {
    this.formGroup = this.createFormGroup('change');
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

  onSubmit(): Subscription | undefined {
    this.isLoading = true;
    this.formGroup.disable();
    this.isPasswordHidden = true;

    return this.authService
      .register$({
        firstName: this.f.firstName?.value as string,
        lastName: this.f.lastName?.value as string,
        email: this.f.email?.value as string,
        password: this.f.password?.value as string,
      })
      .pipe(
        switchMap((res) =>
          this.dialog.open(ConfirmEmailDialogComponent).afterClosed(),
        ),
        takeUntil(this.isDestroyed$),
      )
      .subscribe(
        (afterClosed) => this.router.navigate(['/']),
        (err) => {
          this.errorHappens.emit((err as ApiError).message);
          this.errorMessage = (err as ApiError).message;
          this.isLoading = false;
          this.formGroup.enable();
        },
      );
  }

  onCloseDialog(): Promise<boolean> {
    this.dialog.closeAll();

    return this.router.navigate(['home']);
  }

  private createFormGroup(
    updateOn: 'submit' | 'change',
    previousValue?: { [key: string]: unknown },
  ): FormGroup {
    // tslint:disable
    const formGroup = this.formBuilder.group(
      {
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        password: [
          null,
          [Validators.required, Validators.pattern(/^.{8,255}$/)],
        ],
        confirmPassword: [null, [Validators.required]],
      },
      {
        updateOn,
        validators: [
          this.mustMatchValidator('password', 'confirmPassword'),
          this.mustNotBeRejectedValidator(),
        ],
      },
      // tslint:enable
    );

    if (previousValue !== undefined) {
      formGroup.setValue(previousValue);
    }

    return formGroup;
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

  private mustNotBeRejectedValidator(): (formGroup: FormGroup) => void {
    return (formGroup: FormGroup) => {
      if (this.errorMessage === AuthError.EmailExists) {
        formGroup.controls.email.setErrors({ mustNotBeRejected: true });
      } else if (this.errorMessage !== '') {
        this.snackbarService.open(this.errorMessage, 'warn');
      }
      this.errorMessage = '';
    };
  }
}
