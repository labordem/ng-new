import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Account } from '../models/user.model';
import { ThemeService } from '../services/theme.service';
import { UserService } from '../services/user.service';

export interface Destination {
  name: string;
  path: string;

  icon: string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('appTitleElement') appTitleElement?: ElementRef<HTMLElement>;
  @ViewChild('appDescriptionElement') appDescriptionElement?: ElementRef<
    HTMLElement
  >;

  appTitle = '';
  appDescription = '';
  destinations: Destination[] = [];
  account: Account | undefined;
  readonly appVersion = environment.version;
  readonly isUnknownUserAllowedToNavigate = true;
  private readonly isDestroyed$ = new Subject<boolean>();

  constructor(
    private readonly metaService: Meta,
    private readonly themeService: ThemeService,
    private readonly titleService: Title,
    private readonly userService: UserService,
  ) {
    this.themeService.init();
    this.destinations = [
      {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        name: $localize`:@@home:Home`,
        path: 'home',
        icon: 'home',
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        name: $localize`:@@articles:Articles`,
        path: 'article',
        icon: 'book',
      },
    ];
  }

  ngOnInit(): Subscription {
    return this.userService.account$
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(
        (res) => {
          this.account = res;
        },
        () => {
          this.account = undefined;
        },
      );
  }

  ngAfterViewChecked(): void {
    this.setMeta();
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

  trackByIndex(index: number): number {
    return index;
  }

  private setMeta(): void {
    this.appTitle = this.appTitleElement?.nativeElement?.textContent as string;
    this.titleService.setTitle(this.appTitle);

    this.appDescription = this.appDescriptionElement?.nativeElement
      ?.textContent as string;
    this.metaService.updateTag({
      name: 'description',
      content: this.appDescription,
    });
  }
}
