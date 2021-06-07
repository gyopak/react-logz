# react-logz
a dummy log renderer component

## demo

- check out the [latest build](https://nifty-jones-bbbabf.netlify.app/) on Netlify
- mock API is on a free glitch dyno, awakening takes some time, so initial loading could be slow

## stack

- [Vite](https://vitejs.dev/) for builds and local dev env
- [Material-UI](https://material-ui.com/) for sitebuild and components
- [Redux Toolkit](https://redux-toolkit.js.org/) to grab the goodies for the store (immer, thunk, slices)
- [RTK Queries (beta)](https://rtk-query-docs.netlify.app/) for API fetching / caching

## quick start

```
yarn
yarn dev
```

## deployment

```
yarn build
# will generate static build under `dist` folder
```
