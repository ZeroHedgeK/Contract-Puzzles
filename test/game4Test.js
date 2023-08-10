const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    const signer = ethers.provider.getSigner(2);
    const signerY = ethers.provider.getSigner(1);
    const signerAddress = signer.getAddress();
    const addressY = signerY.getAddress();

    return { game, signer, signerY, signerAddress, addressY};
  }
  it('should be a winner', async function () {
    const { game, signer, signerY, signerAddress, addressY } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    await game.connect(signerY).write(signerAddress);
    await game.connect(signer).win(addressY);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
