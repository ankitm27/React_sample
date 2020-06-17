## Prerequisites
 - [Node v7.6+](https://nodejs.org/en/download/current/)
 - [Yarn](https://yarnpkg.com/en/docs/install)

## Getting Started

1. Clone the repo and make it yours:

```bash
git clone https://github.com/tarifrudrapur/insightmonk-api
cd node-api
```

2. Install dependencies:

```bash
yarn
```

3. Set environment variables:

```bash
cp .env.example .env
```

## Running Locally

```bash
yarn dev
```

## Running in Production

```bash
yarn start
```

## Lint

```bash
# lint code with ESLint
yarn lint

# try to fix ESLint errors
yarn lint:fix

# lint and watch for changes
yarn lint:watch
```

## Validate

```bash
# run lint and tests
yarn validate
```

## Logs

```bash
# show logs in production
pm2 logs
```

## Documentation

```bash
# generate and open api documentation
yarn docs
```

## Rate Limit Configuration
Change configuration in `.env` file
