import { expect } from "chai"
import hre, { ethers } from "hardhat"
import { Signer } from "ethers"
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs"

interface Land {
  titleNo: string
  size: number
  unit: string
  tokenId: number
}

let signers: Signer[], owner: Signer, tenant: Signer
let registryContract: any, landContract: any
const land: Land = {
  titleNo: "FE/E32/HZ",
  size: 32,
  unit: "HA",
  tokenId: 4842,
}

describe("Registry", () => {
  before(async () => {
    signers = await ethers.getSigners()
    owner = signers[0]
    tenant = signers[1]
    registryContract = await hre.ethers.deployContract("Registry")
  })

  describe("register", async () => {
    it("register success", async () => {
      await registryContract.register(land.titleNo, land.unit, await owner.getAddress(), land.size, 4842)

      landContract = (await ethers.getContractFactory("Land")).attach(await registryContract.getLandERC721Contract(land.titleNo))
      const result = await landContract.getLand()
      const count = await landContract.balanceOf(await owner.getAddress())
      const countLands = await registryContract.countTokenizedLands()

      expect(result.titleNo).to.be.equal(land.titleNo)
      expect(result.symbol).to.be.equal(land.unit)
      expect(count).to.be.equal(1)
      expect(countLands).to.be.equal(1)
    })

    it("Dont't register same land parcel", async () => {
      await expect(
        registryContract.register(land.titleNo, land.unit, await owner.getAddress(), 34, 482)
      ).to.be.reverted
    })
  })

  describe("grantUsage", async () => {
    it("grant success", async () => {
    })
  })
})
