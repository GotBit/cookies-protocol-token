import { expect } from 'chai'
import { ethers, time } from 'hardhat'

import { deploy, useContracts } from '@/test'

const getNow = async () => {
  const { token } = await useContracts()
  const nowBlockNumber = await token.provider.getBlockNumber()
  const nowBlock = await token.provider.getBlock(nowBlockNumber)
  return nowBlock.timestamp
}

describe('Token', () => {
  const initAmount = '1_000_000'.toBigNumber(18)

  beforeEach(async () => await deploy())

  it('should mint tokens to user only by owner', async () => {
    const [owner, user] = await ethers.getSigners()
    const { token } = await useContracts()

    const amount = '1_000'.toBigNumber(18)

    await expect(
      token.connect(user).mint(user.address, amount),
      'Not owner cant mint tokens'
    ).reverted

    await expect(
      () => token.connect(owner).mint(user.address, amount),
      'Owner can mint tokens to user'
    ).changeTokenBalance(token, user, amount)
  })

  it('should transfer tokens if user is not locked', async () => {
    const [deployer, user, anotherUser] = await ethers.getSigners()
    const { token } = await useContracts()

    // transfer some tokens to user
    await token.connect(deployer).transfer(user.address, initAmount)
    expect(await token.balanceOf(user.address), 'Correct transfered amount').eq(
      initAmount
    )

    const testAmount = '1_000'.toBigNumber(18)

    await expect(
      () => token.connect(user).transfer(anotherUser.address, testAmount),
      'User can transfer tokens if he is not locked'
    ).changeTokenBalance(token, anotherUser, testAmount)
  })
  it('should deny transfer while user is locked', async () => {
    const [deployer, user, anotherUser] = await ethers.getSigners()
    const { token } = await useContracts()

    // transfer some tokens to user
    await token.connect(deployer).transfer(user.address, initAmount)
    await token.connect(deployer).transfer(anotherUser.address, initAmount)
    expect(await token.balanceOf(user.address), 'Correct transfered amount').eq(
      initAmount
    )

    const testAmount = '1_000'.toBigNumber(18)

    const now = await getNow()
    const delta = 10000
    const unlockTime = now + delta

    await token.setUnlockTimes([user.address], [unlockTime])

    await expect(
      token.connect(user).transfer(anotherUser.address, testAmount),
      'Locked user cannot transfer tokens'
    ).reverted

    /// another user cant transfer tokens
    await token.connect(anotherUser).transfer(anotherUser.address, testAmount)

    /// set timestamp before unlock time
    await time.setNextBlockTimestamp(unlockTime - 1)

    await expect(
      token.connect(user).transfer(anotherUser.address, testAmount),
      'Locked user cannot transfer tokens'
    ).reverted

    /// set timestamp exactly unlock time
    await time.setNextBlockTimestamp(unlockTime)

    await token.connect(user).transfer(anotherUser.address, testAmount)
  })
  it('should let user transfer tokens if owner unlock him', async () => {
    const [deployer, user, anotherUser] = await ethers.getSigners()
    const { token } = await useContracts()

    // transfer some tokens to user
    await token.connect(deployer).transfer(user.address, initAmount)
    expect(await token.balanceOf(user.address), 'Correct transfered amount').eq(
      initAmount
    )

    const testAmount = '1_000'.toBigNumber(18)

    const now = await getNow()
    const delta = 10000
    const unlockTime = now + delta

    await token.setUnlockTimes([user.address], [unlockTime])

    await expect(
      token.connect(user).transfer(anotherUser.address, testAmount),
      'Locked user cannot transfer tokens'
    ).reverted

    await expect(
      token.connect(user).setUnlockTimes([user.address], [0]),
      'User cant set unlock times'
    ).reverted

    await token.connect(deployer).setUnlockTimes([user.address], [0])
    await token.connect(user).transfer(anotherUser.address, testAmount)
  })
  it('should set unlock times for user only by owner', async () => {
    const [owner, user] = await ethers.getSigners()
    const { token } = await useContracts()

    await expect(
      token.connect(user).setUnlockTimes([user.address], [0]),
      'User cant set unlock times'
    ).reverted

    await token.connect(owner).setUnlockTimes([user.address], [0])
  })
  it('should deny set unlock times with different length array', async () => {
    const [owner] = await ethers.getSigners()
    const { token } = await useContracts()

    await expect(
      token.connect(owner).setUnlockTimes([owner.address], [1, 2]),
      'Cant set unlock times with different array sizes'
    ).revertedWith('Different sizes of arrays')
  })

  it('should set antisnipe address only by owner', async () => {
    const [owner, user, antisnipe] = await ethers.getSigners()
    const { token } = await useContracts()

    const antisnipeAddress = antisnipe.address
    await expect(
      token.connect(user).setAntisnipeAddress(antisnipeAddress),
      'User cant set antisnipe address'
    ).reverted

    await token.connect(owner).setAntisnipeAddress(antisnipeAddress)

    expect(await token.antisnipe()).eq(antisnipeAddress)
  })
  it('should disable antisnipe in one-way only by owner', async () => {
    const [owner, user] = await ethers.getSigners()
    const { token } = await useContracts()

    expect(await token.antisnipeDisable()).false
    await expect(token.connect(user).setAntisnipeDisable(), 'User cant disable antisnipe')
      .reverted

    await token.connect(owner).setAntisnipeDisable()

    expect(await token.antisnipeDisable(), 'Antisnipe is disable').true

    await expect(
      token.connect(owner).setAntisnipeDisable(),
      'Cant change state of antisnipe disability'
    ).reverted
  })
  it('should call antisnipe contact on if enable', async () => {
    const [deployer, user, anotherUser] = await ethers.getSigners()
    const { token, anitsnipeMock } = await useContracts()

    // transfer some tokens to user
    await token.connect(deployer).transfer(user.address, initAmount)
    expect(await token.balanceOf(user.address), 'Correct transfered amount').eq(
      initAmount
    )

    await expect(
      token.connect(user).setAntisnipeAddress(anitsnipeMock.address),
      'User cant setup antisnipe address'
    ).reverted

    await token.connect(deployer).setAntisnipeAddress(anitsnipeMock.address)
    expect(await token.antisnipe()).eq(anitsnipeMock.address)

    const amount = '1'.toBigNumber(18)
    await token.connect(user).transfer(anotherUser.address, amount)

    expect(await anitsnipeMock.lastAmount(), 'Correct amount').eq(amount)
    expect(await anitsnipeMock.lastSender(), 'Correct sender').eq(user.address)
    expect(await anitsnipeMock.lastFrom(), 'Correct from').eq(user.address)
    expect(await anitsnipeMock.lastTo(), 'Correct to').eq(anotherUser.address)

    /// disable antisnipe
    await token.connect(deployer).setAntisnipeDisable()

    const newAmount = amount.sub(1)
    await token.connect(anotherUser).transfer(user.address, newAmount)

    /// nothing changed because antisnipe is disable
    expect(await anitsnipeMock.lastAmount()).not.eq(newAmount)
    expect(await anitsnipeMock.lastSender()).not.eq(anotherUser.address)
    expect(await anitsnipeMock.lastFrom()).not.eq(anotherUser.address)
    expect(await anitsnipeMock.lastTo()).not.eq(user.address)
  })
})
