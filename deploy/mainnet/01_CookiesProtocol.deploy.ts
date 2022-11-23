import { ethers } from 'hardhat'
import type { DeployFunction } from 'hardhat-deploy/types'

import { wrapperHRE } from '@/gotbit-tools/hardhat'
import type { CookiesProtocol__factory } from '@/typechain'

const func: DeployFunction = async (hre) => {
  const { deploy } = wrapperHRE(hre)
  const [deployer] = await ethers.getSigners()

  await deploy<CookiesProtocol__factory>('CookiesProtocol', {
    from: deployer.address,
    args: [],
    log: true,
  })
}
export default func

func.tags = ['CookiesProtocol.deploy']
