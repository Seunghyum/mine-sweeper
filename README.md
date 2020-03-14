# react-base

## spec

- react
- storybook
- cypress

## Prerequisite - setting env files

1. make **env** directory to root path
2. make **dev.env**, **prod.env** file
3. type **BASE_URL**, **API_PROT** like

```Shell
BASE_URL="localhost"
API_PORT="3000"
```

it can be edited in

- /build/webpack.config.dev.js
- /build/webpack.config.prod.js

```javascript
new Dotenv({
  path: './env/dev.env',
  ...
})
```

## Running

```Shell
yarn dev # run develop server
yarn build # run build script
yarn sb # run storybook
cypress:open # run cypress for e2e test
```
