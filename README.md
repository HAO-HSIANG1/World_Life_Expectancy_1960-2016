# World_Life_Expectancy_1960-2016

This repository contains the Observable notebook export for **World Life Expectancy 1960–2016**. The static site lives in the `World Life Expectancy 1960–2016/` directory and is deployed automatically to GitHub Pages via GitHub Actions.

## Local preview

Run any static file server from inside the project folder:

```sh
cd "World Life Expectancy 1960–2016"
npx http-server
```

Then open the printed URL in your browser.

## Deployment

Pushes to the `work` branch trigger the GitHub Pages workflow defined in `.github/workflows/pages.yml`. The workflow uploads the contents of `World Life Expectancy 1960–2016/` as the site artifact and publishes it to the repository's Pages environment.
