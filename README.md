# World Life Expectancy 1960–2016

This repository contains a static Observable notebook export for visualizing world life expectancy data from 1960 to 2016. The static site lives in the `World Life Expectancy 1960–2016` directory and can be served locally or published via GitHub Pages.

## Local preview

From the project root, start any static file server pointed at the site directory, for example:

```sh
npx http-server "World Life Expectancy 1960–2016"
```

Then open the reported localhost URL in your browser.

## Deployment

A GitHub Actions workflow (`.github/workflows/deploy.yml`) publishes the contents of the `World Life Expectancy 1960–2016` directory to GitHub Pages whenever changes are pushed to the `main` branch. You can also trigger the workflow manually from the Actions tab using the **Run workflow** button.
