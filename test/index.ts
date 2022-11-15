import { deployments, ethers } from 'hardhat'

import type { CookiesProtocol, AntisnipeMock } from '@/typechain'

export const useContracts = async () => {
  return {
    token: await ethers.getContract<CookiesProtocol>('CookiesProtocol'),
    anitsnipeMock: await ethers.getContract<AntisnipeMock>('AntisnipeMock'),
  }
}

export const deploy = deployments.createFixture(() =>
  deployments.fixture(undefined, { keepExistingDeployments: true })
)
