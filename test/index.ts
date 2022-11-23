import { deployments, ethers } from 'hardhat'

import type { CookiesProtocol } from '@/typechain'

export const useContracts = async () => {
  return {
    token: await ethers.getContract<CookiesProtocol>('CookiesProtocol'),
  }
}

export const deploy = deployments.createFixture(() =>
  deployments.fixture(undefined, { keepExistingDeployments: true })
)
