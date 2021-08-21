'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ng-new documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-f65c899c51a118a4e252449dd8c91ac1"' : 'data-target="#xs-components-links-module-AppModule-f65c899c51a118a4e252449dd8c91ac1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-f65c899c51a118a4e252449dd8c91ac1"' :
                                            'id="xs-components-links-module-AppModule-f65c899c51a118a4e252449dd8c91ac1"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ArticleModule.html" data-type="entity-link">ArticleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ArticleModule-f98df390baa817968e944d4d993398cf"' : 'data-target="#xs-components-links-module-ArticleModule-f98df390baa817968e944d4d993398cf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ArticleModule-f98df390baa817968e944d4d993398cf"' :
                                            'id="xs-components-links-module-ArticleModule-f98df390baa817968e944d4d993398cf"' }>
                                            <li class="link">
                                                <a href="components/ArticleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ArticleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-09ca3c1ed278f052d6aad49c2b864f83"' : 'data-target="#xs-components-links-module-AuthModule-09ca3c1ed278f052d6aad49c2b864f83"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-09ca3c1ed278f052d6aad49c2b864f83"' :
                                            'id="xs-components-links-module-AuthModule-09ca3c1ed278f052d6aad49c2b864f83"' }>
                                            <li class="link">
                                                <a href="components/AuthComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfirmEmailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConfirmEmailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfirmEmailDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConfirmEmailDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ForgotPasswordComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ForgotPasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ForgotPasswordDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ForgotPasswordDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResetPasswordComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResetPasswordComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CoreModule-6ac7ac50cdd62672af26702ad275c792"' : 'data-target="#xs-components-links-module-CoreModule-6ac7ac50cdd62672af26702ad275c792"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CoreModule-6ac7ac50cdd62672af26702ad275c792"' :
                                            'id="xs-components-links-module-CoreModule-6ac7ac50cdd62672af26702ad275c792"' }>
                                            <li class="link">
                                                <a href="components/LayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LayoutFooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayoutFooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LayoutNavComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayoutNavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LayoutSettingsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayoutSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LayoutSidenavComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayoutSidenavComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link">HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-0d5680c1f844d95a4331493b645c1a91"' : 'data-target="#xs-components-links-module-HomeModule-0d5680c1f844d95a4331493b645c1a91"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-0d5680c1f844d95a4331493b645c1a91"' :
                                            'id="xs-components-links-module-HomeModule-0d5680c1f844d95a4331493b645c1a91"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotFoundModule.html" data-type="entity-link">NotFoundModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NotFoundModule-4aafd32bc345247c5ba5ac7d9395fb38"' : 'data-target="#xs-components-links-module-NotFoundModule-4aafd32bc345247c5ba5ac7d9395fb38"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NotFoundModule-4aafd32bc345247c5ba5ac7d9395fb38"' :
                                            'id="xs-components-links-module-NotFoundModule-4aafd32bc345247c5ba5ac7d9395fb38"' }>
                                            <li class="link">
                                                <a href="components/NotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotFoundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-SharedModule-08b2f6c6309dd15c415a26839b4e8ff0"' : 'data-target="#xs-directives-links-module-SharedModule-08b2f6c6309dd15c415a26839b4e8ff0"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SharedModule-08b2f6c6309dd15c415a26839b4e8ff0"' :
                                        'id="xs-directives-links-module-SharedModule-08b2f6c6309dd15c415a26839b4e8ff0"' }>
                                        <li class="link">
                                            <a href="directives/ImageDefaultDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImageDefaultDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-SharedModule-08b2f6c6309dd15c415a26839b4e8ff0"' : 'data-target="#xs-pipes-links-module-SharedModule-08b2f6c6309dd15c415a26839b4e8ff0"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-08b2f6c6309dd15c415a26839b4e8ff0"' :
                                            'id="xs-pipes-links-module-SharedModule-08b2f6c6309dd15c415a26839b4e8ff0"' }>
                                            <li class="link">
                                                <a href="pipes/ApiPathPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ApiPathPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStorageService.html" data-type="entity-link">LocalStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogService.html" data-type="entity-link">LogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SnackbarService.html" data-type="entity-link">SnackbarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemeService.html" data-type="entity-link">ThemeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/HttpErrorInterceptor.html" data-type="entity-link">HttpErrorInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/HttpJwtInterceptor.html" data-type="entity-link">HttpJwtInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/ConfirmedUserGuard.html" data-type="entity-link">ConfirmedUserGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/NotUserGuard.html" data-type="entity-link">NotUserGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/UserGuard.html" data-type="entity-link">UserGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Account.html" data-type="entity-link">Account</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ApiError.html" data-type="entity-link">ApiError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Destination.html" data-type="entity-link">Destination</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ForogtPasswordDto.html" data-type="entity-link">ForogtPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoggedInUser.html" data-type="entity-link">LoggedInUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoggedInUser-1.html" data-type="entity-link">LoggedInUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginDto.html" data-type="entity-link">LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MockUser.html" data-type="entity-link">MockUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterDto.html" data-type="entity-link">RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResetPasswordDto.html" data-type="entity-link">ResetPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Upload.html" data-type="entity-link">Upload</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});