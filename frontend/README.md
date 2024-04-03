# Running the code

## Package manager

This project is managed and build with `PNPM` as the package manager, however, `NPM` is also supported. For installation of `PNPM`, see the [installation instructions](https://pnpm.io/installation).

## Serving the application

- Open a terminal of your choice or within your IDE;
- Navigate to the `frontend` folder of this project;
- Run `pnpm install` to install the dependencies of this project;
- Run `pnpm start` to start the Angular dev server.

After a quick build, the frontend application will be reachable at `http://localhost:4200`.

## Notes

>The frontend application expects the REST API backend to be served at `http://localhost:3000`. If you decide to serve the backend at another domain or port, you must change the `target` property of the [proxy config file](/frontend/proxy.conf.json) accordingly.

## Potential improvements/enhancements

- Automated E2E testing (e.g. Cypress)
- i18n functionality
- Customized component library (e.g. buttons)
- Customized error messages
- Page transition animations and element interactivity animations
