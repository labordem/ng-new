import {
  ChangeDetectionStrategy,
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
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { SnackbarService } from '../../core/services/snackbar.service';
import { AuthError } from '../auth.model';
import { AuthService } from '../auth.service';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
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

    return this.authService
      .forgotPassword$(this.f.email?.value as string)
      .pipe(
        switchMap(() =>
          this.dialog.open(ForgotPasswordDialogComponent).afterClosed(),
        ),
        takeUntil(this.isDestroyed$),
      )
      .subscribe(
        () => this.router.navigate(['/auth']),
        (err: unknown) => {
          this.errorMessage = (err as Error)?.message;
          this.isLoading = false;
          this.formGroup.enable();
        },
      );
  }

  private createFormGroup(updateOn: 'submit' | 'change'): FormGroup {
    return this.formBuilder.group(
      {
        email: [null, [Validators.required, Validators.email]],
      },
      {
        updateOn,
        validators: this.mustNotBeRejectedValidator(),
      },
    );
  }

  private mustNotBeRejectedValidator(): () => void {
    return () => {
      if (this.errorMessage === AuthError.EmailNotFound) {
        this.f.email.setErrors({ mustNotBeRejected: true });
      } else if (this.errorMessage !== '') {
        this.snackbarService.open(this.errorMessage, 'warn');
      }
      this.errorMessage = '';
    };
  }
}
