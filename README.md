# World Life Expectancy 1960–2016

This repository contains a static Observable notebook export that visualizes world life expectancy data from 1960–2016. The site lives in the [`docs/`](docs) folder so it can be published directly to GitHub Pages without any build step.

## Local development

To preview the site locally:

```sh
cd docs
npx http-server
```

Then open the printed URL (for example, <http://127.0.0.1:8080>). Any static web server works as long as it serves the `docs` directory.

## Deployment (GitHub Pages)

A GitHub Actions workflow automatically deploys the contents of `docs/` to GitHub Pages whenever you push to the `main`, `master`, or `work` branch.

1. In the repository settings, enable GitHub Pages and set the source to "GitHub Actions".
2. Push your changes to the repository.
3. Once the **Deploy GitHub Pages** workflow finishes, your site will be available at the Pages URL printed in the workflow run summary.

You can also trigger a manual deployment from the Actions tab using the **workflow_dispatch** option.
