# Cookies Protocol Token

## Getting Started

Recommended Node version is 16.0.0.

```bash
$ yarn
$ yarn compile
$ yarn testf
```

## Project Structure

This a hardhat typescript project with `hardhat-deploy` extension.

### Tests

Tests are found in the `./test/` folder.

To run tests

```bash
$ yarn testf
```

To run coverage

```bash
$ yarn coverage
```

### Coverage result

```text
  Token
    ✔ should mint tokens to user only by owner (57ms)
    ✔ should transfer tokens if user is not locked (54ms)
    ✔ should deny transfer while user is locked (98ms)
    ✔ should let user transfer tokens if owner unlock him (76ms)
    ✔ should set unlock times for user only by owner
    ✔ should deny set unlock times with different length array
    ✔ should set antisnipe address only by owner
    ✔ should disable antisnipe in one-way only by owner (41ms)
    ✔ should call antisnipe contact on if enable (108ms)


  9 passing (701ms)

----------------------|----------|----------|----------|----------|----------------|
File                  |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------------------|----------|----------|----------|----------|----------------|
 contracts/           |      100 |      100 |      100 |      100 |                |
  CookiesProtocol.sol |      100 |      100 |      100 |      100 |                |
 contracts/mock/      |      100 |      100 |      100 |      100 |                |
  AntisnipeMock.sol   |      100 |      100 |      100 |      100 |                |
----------------------|----------|----------|----------|----------|----------------|
All files             |      100 |      100 |      100 |      100 |                |
----------------------|----------|----------|----------|----------|----------------|
```

### Contracts

Solidity smart contracts are found in `./contracts/`.
`./contracts/mock` folder contains contracts mocks that are used for testing purposes.

### Deploy

Deploy script can be found in the `./deploy/localhost` for local testing and `./deploy/mainnet` for mainnet deploy

Generate `.env` file

```bash
$ cp .env.example .env
```

Add .env file to the project root.

To add the private key of a deployer account, assign the following variable

```
PRIVATE_TEST=
PRIVATE_MAIN=
```

To add API Keys for verifying

```
API_ETH=
API_BSC=
API_POLYGON=
API_AVAX=
API_FTM=
API_ARBITRUM=
```

To deploy contracts on `Binance mainnet`

```bash
$ yarn deploy --network bsc_mainnet
```

### Deployments

Deployments on mainnets and testnets store in `./deployments`

### Verify

To verify contracts on `Binanace mainnet`

```bash
$ yarn verify --network bsc_mainnet
```

## Custom functionality

### Antisnipe

3rd party dependecy to protect tokens from bot snipers

#### Function `setAntisnipeAddress`

```solidity
function setAntisnipeAddress(address addr) external onlyOwner
```

Only owner can set antisnipe address

#### Function `setAntisnipeDisable`

```solidity
function setAntisnipeDisable() external onlyOwner
```

Only owner can **one-way** disable antisnipe

### Time-lock transfers

Ability to lock tokens for the user up to a certain moment

#### Function `setUnlockTimes`

```solidity
function setUnlockTimes(address[] memory users, uint256[] memory timestamps) external onlyOwner
```

Only the owner can set the unlock time for users. This prevents users from transferring the token before the unlock time

### Function `mint`

```solidity
function mint(address user, uint256 amount) external onlyOwner
```

Only owner can mint tokens

### Overriding `_beforeTokenTransfer`

ERC20 function `_beforeTokenTransfer` overriding in `CookiesProtocol` to implement [Time-lock transfer](#time-lock-transfers) and [Antisnipe](#antisnipe) functionality
