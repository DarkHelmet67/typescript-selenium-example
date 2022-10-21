# TypeScript + Selenium example

This is a working example of using `Selenium`, `TypeScript` and [Page Object Pattern](https://martinfowler.com/bliki/PageObject.html).
These are real test cases that run against a [Fider](http://getfider.com) instance.
Check out a running example of the application at [http://demo.fider.io](http://demo.fider.io).

# How it is structured

```
.
├── lib/
├── pages/
├── specs/
├── tests/
└── config.ts
```

- `lib`: Think of this as a "framework". Ideally should be a separate module distributed on `npm`
- `pages`: These are your `Page Object` models. Each Page of your application should have a PageObject that maps all the elements and actions
- `specs`: All your BDD-style tests goes here
- `tests`: All your TDD-style/classic tests goes here
- `config.ts`: General configuration and settings that are read by tests

## Test Case #1: Unauthenticated cannot submit ideas


# See the tests

