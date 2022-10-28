# TypeScript + Selenium example

Forked from https://github.com/goenning/typescript-selenium-example


This is a working example of using `Selenium`, `TypeScript` and [Page Object Pattern](https://martinfowler.com/bliki/PageObject.html) using excercises as tests

This repo should work on both Linux and Windows machines (using `rimraf` and `npm-run-all`)

# How it is structured

```
.
├── assets/     -> Linux/Win Chromedrivers
├── test/       -> Tests/Lessons
│   ├── helpers -> Browser Model
│   └── pages   -> Page Object Model
```

# Setup
* Check the version of Chrome currently installed on the machine you want to use for the tests
* Download the correct Chromedriver from https://chromedriver.chromium.org/downloads to drive it
* Save it to folder assets/chromedriver/`release`/`os`, e.g. `assets/chromedriver/106.0.5249.61/linux64`
* Update the path inside `.npmrc` file, e.g. `chromedriver_filepath=/assets/chromedriver/106.0.5249.61/win32/chromedriver_win32.zip`
* Install dependencies with `npm install`


# How to run the tests
There is a test for each lesson, e.g. `npm run test:lesson-1`

To run all test simply type `npm run test:all`