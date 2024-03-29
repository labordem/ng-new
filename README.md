<div align="center">
<p><img src="https://angular.io/assets/images/logos/angular/angular.svg" height="152"></p>

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Conventional Changelog](https://img.shields.io/badge/changelog-conventional-brightgreen.svg)](http://conventional-changelog.github.io)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

![angular version](https://img.shields.io/github/package-json/dependency-version/miaborde/ng-new/@angular/core?label=angular&logo=angular)

[demo (en-US)](https://miaborde.github.io/ng-new/en-US) - [demo (fr)](https://miaborde.github.io/ng-new/fr) - [compodoc](https://miaborde.github.io/ng-new/compodoc) - [changelog](./CHANGELOG.md)

</div>

## Make it yours

- Clone this project and move into it
- Reset git history : `rm -rf .git && git init`
- Run `npm ci` after reset git history (important for pre-commit hooks)
- Replace ALL `ng-new` occurrence with your project name
- Replace ALL `Angular progressive web app starter.` occurrence with your project description
- Replace ALL `miaborde` occurrence with your Github username
- Change icons in **assets** folder, You can generate yours with [pwa-asset-generator](https://www.npmjs.com/package/pwa-asset-generator)
- If you not using Firebase you can delete all related files : `rm -r *firebase* .firebase*`
- You're good to go :)

> If you want the full stack you can get corresponding API [here](https://github.com/mIaborde/nest-new).

## Run it in development

### Local Node.js

You can run this project in watch/debug mode in local dev environment, to do so you need [Node.js](https://nodejs.org).

**Example :**

```bash
# install dependencies
npm i
# run in development mode, default language
npm run start
# run in development mode, in french
npm run start:fr
```

### Containerized

You can run this project in watch/debug mode in fully containerized environment, to do so you just need [Docker](https://docs.docker.com/get-docker/) (for linux users you also need [Docker-compose](https://docs.docker.com/compose/install/)).

**Example :**

```bash
# with docker only
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up

# if you have Docker AND Node.js installed you can use short commands :
npm run docker:build
npm run docker
```

> When you add a npm package to your project you need to force your container to build.

### VSCode debugger

With [Visual Studio Code](https://code.visualstudio.com/) you can easily launch this app in debug mode, you just need Google Chrome. All settings are already done in **.vscode** folder. Follow this [guide](https://github.com/microsoft/vscode-recipes/tree/master/Angular-CLI) to know more.

> **If you want to 'attach' debugger**
> You need to open your Chrome instance with `chrome --remote-debugging-port=9222`

> **If you want Chromium instead of Chrome on Linux distros**
>
> create an alias with this command : `sudo ln -s /usr/bin/chromium /usr/bin/google-chrome`, path can be different on your distro !

## Run it in production

### Containerized

You can run this project in production mode in container, to do so you just need [Docker](https://docs.docker.com/get-docker/).

**Example :**

```bash
# with docker only
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up

# if you have Docker AND Node.js installed you can use short commands :
npm run docker:build:prod
npm run docker:prod
```

## Documentation

- **Code documentation:** this project use [Compodoc](https://compodoc.app/guides/getting-started.html) a documentation tool for Angular & Nestjs applications. It generates a static documentation of your application.

**Example :**

```bash
# code documentation: build doc website and open it
npm run doc
```

## Git flow

This project respects [Conventional commits](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit), a Git commit convention made by the Angular team. Basically, every pull request should end up with one commit and a standardized commit message.

To easily respect this a tool is provided: [Commitizen](https://github.com/commitizen/cz-cli) called with `npm run cz` command, you are not obligated to use it, if you make your commits manually they will be tested too.

> **Attention !**
> Do not commit without a **node_modules** folder at the root of the project (run `npm i` command to get it), otherwise your commit and your code will not trigger `lint` / `format` / `cz` scripts.

**Example :**

```bash
# add your changes
git add .
# commit with commitizen-cli
npm run cz
# push changes
git push

# if your commit fail you can perform changes and retry with previous message
npm run cz -- --retry
```

## Create a release

This project respects [Semantic Versioning](https://semver.org).
To easily respect this specification a tool is provided: [Standard-version](https://github.com/conventional-changelog/standard-version).

> **Note:** commit or stash any changes before create a release.
> **Note:** Semantic versioning works differently for versions starting with `v0.x.x`. Everything before `v1.0.0` is considered experimental and breaking changes are only minor version bumps. The moment you feel comfortable you need to bump the version manually to `v1.0.0` and then the well-known versioning kicks in where breaking changes bump the major version, features bump the minor and fixes bump the patch version.

**Example :**

```bash
# add your changes
git add .

# release first version of the project (v0.0.0)
npm run release -- --first-release
# OR
# release first stable version of the project (v1.0.0)
npm run release -- --release-as 1.0.0
# OR
# perform a prerelease
npm run release:prerelease
# OR
# perform a release
npm run release

# push your changes, WITH version tags
git push --follow-tags
```

> **When you perform a release you automatically perform the following actions :**
>
> - increment version number in **package.json** (uses the `fix:` and `feat:` tags to establish the semantic versioning)
> - add a [Git tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
> - build project in prod mode for [Github Pages](https://pages.github.com/) demos and [Documentation](#documentation) in **./docs** folder
> - create/update [CHANGELOG.md](./CHANGELOG.md)
> - commit all staged changes with correct commit message

## Internationalization

This project is available in multiple languages, it implements [Angular internationalization](https://angular.io/guide/i18n). If you run it in containerized mode Nginx server redirects users to the correct version of the app, according to their browser language.

When you add/modify/delete a localized string in project you have to update locale to generate new **messages.xlf** file and translate the new string in **messages.{fr,others}.xlf** file(s). To do this, it is advisable to use a translation software like [Poedit](https://poedit.net/).

**Example :**

```bash
# update locale
npm run locale
```

> When you update locale you automatically perform the following actions :
>
> - update **messages.xlf** with angular built-in internationalization module
> - merge **messages.xlf** and **messages.fr.xlf** using [ngx-i18nsupport-lib](https://github.com/martinroob/ngx-i18nsupport-lib)

## Performances monitoring

- **Source map explorer:** determines which file each byte in your minified code came from. It shows you a treemap visualization to help you debug where all the code is coming from.

- **Webdev measure:** analyzes web apps and web pages, collecting modern performance metrics and insights on developer best practices. [Click here to check your app](https://web.dev/measure/)

**Example :**

```bash
# analyze your webpack bundle with source-map-explorer
npm run analyze
```

## Deploy it

### Firebase

- Login to your Firebase account if needed : `npm i -g firebase-tools && firebase login`
- I18n configuration is already done in **firebase.json**, you just have to rename your project in **.firebaserc** and deploy with : `firebase deploy`
