![This is header image](/src/assets/images/coronatime.png)

# Coronatime App

## Coronatime is app, which display countries covid statistics for authorized users.

# Table of Contents
## [Prerequisites](#Prerequisites)
## [Tech Stack](#Tech-Stack)
## [Getting Started](#Getting-Started)
## [Project Structure](#Project-Structure)
## [Resources](#Resources)
## [Testing](#Testing)

# Prerequisites

<img src="readme/nodejs.png" width="25" style="top: 8px" /> *Node JS @16.X and up*
<img src="readme/npm.png" width="25" style="top: 8px" /> *npm @8 and up*
<img src="readme/typescript.png" width="25" style="top: 8px" /> *typescript @4 and up*

# Tech Stack

<img src="readme/react.png" width="25" style="top: 8px" /> *React @ 18.0.0 - front-end framework*
<img src="readme/i18next.png" width="25" style="top: 8px" /> *i18next @21.8.5 - library for translation*

# Getting Started
## 1. First of all you need to clone app repository from github:
```
git clone https://github.com/RedberryInternship/covid19-nikanoza
```
## 2. Next step requires install all the dependencies.

```
npm install
```

# Project Structure

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
# Testing

## For testing we are using Cypress. You can see all testing files on Cypres e2e subfolder.
```
cypress/e2e
```
## If you want to see test in action, you need install cypress first

```
npm install cypress --save-dev
```
## then open Cypress
```
npx cypress open
``` 
## [More information about Cypress](https://www.cypress.io)

# Resources
## This site was built using [figma](https://www.figma.com/file/O9A950iYrHgZHtBuCtNSY8/Coronatime?node-id=0%3A1).
## [Api documentation](https://coronatime-api.devtest.ge/)
## [github commit rules](https://redberry.gitbook.io/resources/git-is-semantikuri-komitebi)
