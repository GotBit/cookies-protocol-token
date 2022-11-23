import { deployments, ethers } from 'hardhat'

import type { AntisnipeMock, CookiesProtocol } from '@/typechain'

export const useContracts = async () => {
  return {
    token: await ethers.getContract<CookiesProtocol>('CookiesProtocol'),
    antisnipeMock: await ethers.getContract<AntisnipeMock>('AntisnipeMock'),
  }
}

export const deploy = deployments.createFixture(() =>
  deployments.fixture(undefined, { keepExistingDeployments: true })
)
