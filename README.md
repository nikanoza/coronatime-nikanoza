![This is header image](/src/assets/images/coronatime.png)

## Coronatime App

Coronatime is app, which display countries covid statistics for authorized users.

### Table of Contents
* [Prerequisites](#Prerequisites)
* [Tech Stack](#Tech-Stack)
* [Getting Started](#Getting-Started)
* [Project Structure](#Project-Structure)
* [Testing](#Testing)
* [Deployment](#Deployment)
* [Resources](#Resources)

#
### Prerequisites

* <img src="readme/nodejs.png" width="25" style="top: 8px" /> *Node JS @16.X and up*
* <img src="readme/npm.png" width="25" style="top: 8px" /> *npm @8 and up*
* <img src="readme/typescript.png" width="25" style="top: 8px" /> *typescript @4 and up*

#
### Tech Stack

* <img src="readme/react.png" width="25" style="top: 8px" /> *React @ 18.0.0 - front-end framework*
* <img src="readme/i18next.png" width="25" style="top: 8px" /> *i18next @21.8.5 - library for translation*
* <img src="readme/cypress.png" width="25" style="top: 8px" /> *Cyprss @10.0.3 - end to end testing Framework*
* <img src="readme/tailwind.png" width="25" style="top: 8px" /> *Tailwind @3.0.24 - CSS framework*
* <img src="readme/react-hook-form.png" width="25" style="top: 8px" /> *React-hook-form @7.31.2 - library for forms*
* <img src="readme/react.png" width="25" style="top: 8px" /> *React-select @5.3.2 - Select Input control*
* <img src="readme/react-router.png" width="25" style="top: 8px" /> *React-router @6.3.0 - library for routing*

#
### Getting Started
1. First of all you need to clone app repository from github:
```
git clone https://github.com/RedberryInternship/coronatime-nikanoza.git
```
2. Next step requires install all the dependencies.

```
npm install
```

#
### Project Structure

```
|--- src
|   |--- assets # project images
|   |--- components # reusable components
|   |---|--- index.js # export all components
|   |--- pages # all page components
|   |---|--- page-folder # page folder name
|   |---|---|--- page-name.js # react component
|   |---|---|--- index.js # export default component
|   |---|--- index.js # export all pages
|   |--- hooks # custom hooks
|   |--- locals # translation files
- .eslintrc.json  # eslint config file
- .prettierrc.js  # prettier config file
- tailwind.config.js # tailwind config file
- package.json     # dependency manager configurations
```
#
### Testing

For testing we are using Cypress. You can see all testing files on Cypres e2e subfolder.
```
cypress/e2e
```
If you want to see test in action, you need install cypress first

```
npm install cypress --save-dev
```
then open Cypress
```
npx cypress open
``` 
[More information about Cypress](https://www.cypress.io)

#
### Deployment
Before every deployment you need to create build file.
```
npm run build
```
after this you can use this file to deploy project on server.

#
### Resources
* [figma](https://www.figma.com/file/O9A950iYrHgZHtBuCtNSY8/Coronatime?node-id=0%3A1).
* [Api documentation](https://coronatime-api.devtest.ge/)
* [github commit rules](https://redberry.gitbook.io/resources/git-is-semantikuri-komitebi)
