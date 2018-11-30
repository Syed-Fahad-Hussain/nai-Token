const { assertRevert } = require('./assertRevert');
const StandardToken = artifacts.require('NAiToken');
const fs = require('fs');

const BigNumber = web3.BigNumber;

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

// Token attributes
const totalSupply = 20000000000000

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('NAiToken', function ([_, owner, recipient, anotherAccount]) {
  owner = web3.eth.accounts[0]

  beforeEach(async function () {
    this.token = await StandardToken.new();
  });

  describe('migrate token data', function () {
   // let file = "/media/sami/Local Disk/Workspace/Xord.one/NAi/nai-token/test/token-data.csv";
      let file = "/home/syed-fahad/Documents/nai-token/test/token-data.csv";
    it('transfers new tokens to the previous token holders', async function () {
      var text = fs.readFileSync('/home/syed-fahad/Documents/nai-token/test/token-data.csv','utf8')
      let split = text.split('\n')
      let transactions = []
      for (let i = 0; i < split.length; i++) {
        let tran = split[i].split(',')
        transactions.push({
          address: tran[0],
          amount: tran[1]
        })
      }

      let count = 0
      for (let i = 0; i < transactions.length; i++) {
        const { logs } = await this.token.transfer(transactions[i].address, transactions[i].amount, { from: owner });
        if (logs[0].event == 'Transfer') {
          count++
        }
      }
      count.should.be.eq(transactions.length)
    });
  });

  // describe('total supply', function () {
  //   it('returns the total amount of tokens', async function () {
  //     const supply = await this.token.totalSupply();
  //     supply.should.be.bignumber.equal(totalSupply);
  //   });
  // });

  // describe('balanceOf', function () {
  //   describe('when the requested account has no tokens', function () {
  //     it('returns zero', async function () {
  //       const balance = await this.token.balanceOf(anotherAccount);
  //       balance.should.be.bignumber.equal(0);
  //     });
  //   });

  //   describe('when the requested account has some tokens', function () {
  //     it('returns the total amount of tokens', async function () {
  //       const balance = await this.token.balanceOf(owner);
  //       balance.should.be.bignumber.equal(totalSupply);
  //     });
  //   });
  // });

  // describe('transfer', function () {
  //   describe('when the recipient is not the zero address', function () {
  //     const to = recipient;

  //     describe('when the sender does not have enough balance', function () {
  //       const amount = totalSupply + 1;

  //       it('reverts', async function () {
  //         await assertRevert(this.token.transfer(to, amount, { from: owner }));
  //       });
  //     });

  //     describe('when the sender has enough balance', function () {
  //       const amount = 100;

  //       it('transfers the requested amount', async function () {
  //         await this.token.transfer(to, amount, { from: owner });

  //         const senderBalance = await this.token.balanceOf(owner);
  //         senderBalance.should.be.bignumber.equal(totalSupply - amount);

  //         const recipientBalance = await this.token.balanceOf(to);
  //         recipientBalance.should.be.bignumber.equal(amount);
  //       });

  //       it('emits a transfer event', async function () {
  //         const { logs } = await this.token.transfer(to, amount, { from: owner });

  //         logs.length.should.eq(1);
  //         logs[0].event.should.eq('Transfer');
  //         logs[0].args.from.should.eq(owner);
  //         logs[0].args.to.should.eq(to);
  //         logs[0].args.value.should.be.bignumber.equal(amount);
  //       });
  //     });
  //   });

  //   describe('when the recipient is the zero address', function () {
  //     const to = ZERO_ADDRESS;

  //     it('reverts', async function () {
  //       await assertRevert(this.token.transfer(to, 100, { from: owner }));
  //     });
  //   });
  // });

  // describe('approve', function () {
  //   describe('when the spender is not the zero address', function () {
  //     const spender = recipient;

  //     describe('when the sender has enough balance', function () {
  //       const amount = 100;

  //       it('emits an approval event', async function () {
  //         const { logs } = await this.token.approve(spender, amount, { from: owner });

  //         logs.length.should.eq(1);
  //         logs[0].event.should.eq('Approval');
  //         logs[0].args.owner.should.eq(owner);
  //         logs[0].args.spender.should.eq(spender);
  //         logs[0].args.value.should.be.bignumber.equal(amount);
  //       });

  //       describe('when there was no approved amount before', function () {
  //         it('approves the requested amount', async function () {
  //           await this.token.approve(spender, amount, { from: owner });

  //           const allowance = await this.token.allowance(owner, spender);
  //           allowance.should.be.bignumber.equal(amount);
  //         });
  //       });

  //       describe('when the spender had an approved amount', function () {
  //         beforeEach(async function () {
  //           await this.token.approve(spender, 1, { from: owner });
  //         });

  //         it('approves the requested amount and replaces the previous one', async function () {
  //           await this.token.approve(spender, amount, { from: owner });

  //           const allowance = await this.token.allowance(owner, spender);
  //           allowance.should.be.bignumber.equal(amount);
  //         });
  //       });
  //     });

  //     describe('when the sender does not have enough balance', function () {
  //       const amount = 101;

  //       it('emits an approval event', async function () {
  //         const { logs } = await this.token.approve(spender, amount, { from: owner });

  //         logs.length.should.eq(1);
  //         logs[0].event.should.eq('Approval');
  //         logs[0].args.owner.should.eq(owner);
  //         logs[0].args.spender.should.eq(spender);
  //         logs[0].args.value.should.be.bignumber.equal(amount);
  //       });

  //       describe('when there was no approved amount before', function () {
  //         it('approves the requested amount', async function () {
  //           await this.token.approve(spender, amount, { from: owner });

  //           const allowance = await this.token.allowance(owner, spender);
  //           allowance.should.be.bignumber.equal(amount);
  //         });
  //       });

  //       describe('when the spender had an approved amount', function () {
  //         beforeEach(async function () {
  //           await this.token.approve(spender, 1, { from: owner });
  //         });

  //         it('approves the requested amount and replaces the previous one', async function () {
  //           await this.token.approve(spender, amount, { from: owner });

  //           const allowance = await this.token.allowance(owner, spender);
  //           allowance.should.be.bignumber.equal(amount);
  //         });
  //       });
  //     });
  //   });

  //   describe('when the spender is the zero address', function () {
  //     const amount = 100;
  //     const spender = ZERO_ADDRESS;

  //     it('approves the requested amount', async function () {
  //       await this.token.approve(spender, amount, { from: owner });

  //       const allowance = await this.token.allowance(owner, spender);
  //       allowance.should.be.bignumber.equal(amount);
  //     });

  //     it('emits an approval event', async function () {
  //       const { logs } = await this.token.approve(spender, amount, { from: owner });

  //       logs.length.should.eq(1);
  //       logs[0].event.should.eq('Approval');
  //       logs[0].args.owner.should.eq(owner);
  //       logs[0].args.spender.should.eq(spender);
  //       logs[0].args.value.should.be.bignumber.equal(amount);
  //     });
  //   });
  // });

  // describe('transfer from', function () {
  //   const spender = recipient;

  //   describe('when the recipient is not the zero address', function () {
  //     const to = anotherAccount;

  //     describe('when the spender has enough approved balance', function () {
  //       beforeEach(async function () {
  //         await this.token.approve(spender, 100, { from: owner });
  //       });

  //       describe('when the owner has enough balance', function () {
  //         const amount = 100;

  //         it('transfers the requested amount', async function () {
  //           await this.token.transferFrom(owner, to, amount, { from: spender });

  //           const senderBalance = await this.token.balanceOf(owner);
  //           senderBalance.should.be.bignumber.equal(totalSupply - amount);

  //           const recipientBalance = await this.token.balanceOf(to);
  //           recipientBalance.should.be.bignumber.equal(amount);
  //         });

  //         it('decreases the spender allowance', async function () {
  //           await this.token.transferFrom(owner, to, amount, { from: spender });

  //           const allowance = await this.token.allowance(owner, spender);
  //           allowance.should.be.bignumber.equal(0);
  //         });

  //         it('emits a transfer event', async function () {
  //           const { logs } = await this.token.transferFrom(owner, to, amount, { from: spender });

  //           logs.length.should.eq(1);
  //           logs[0].event.should.eq('Transfer');
  //           logs[0].args.from.should.eq(owner);
  //           logs[0].args.to.should.eq(to);
  //           logs[0].args.value.should.be.bignumber.equal(amount);
  //         });
  //       });

  //       describe('when the owner does not have enough balance', function () {
  //         const amount = 101;

  //         it('reverts', async function () {
  //           await assertRevert(this.token.transferFrom(owner, to, amount, { from: spender }));
  //         });
  //       });
  //     });

  //     describe('when the spender does not have enough approved balance', function () {
  //       beforeEach(async function () {
  //         await this.token.approve(spender, 99, { from: owner });
  //       });

  //       describe('when the owner has enough balance', function () {
  //         const amount = 100;

  //         it('reverts', async function () {
  //           await assertRevert(this.token.transferFrom(owner, to, amount, { from: spender }));
  //         });
  //       });

  //       describe('when the owner does not have enough balance', function () {
  //         const amount = 101;

  //         it('reverts', async function () {
  //           await assertRevert(this.token.transferFrom(owner, to, amount, { from: spender }));
  //         });
  //       });
  //     });
  //   });

  //   describe('when the recipient is the zero address', function () {
  //     const amount = 100;
  //     const to = ZERO_ADDRESS;

  //     beforeEach(async function () {
  //       await this.token.approve(spender, amount, { from: owner });
  //     });

  //     it('reverts', async function () {
  //       await assertRevert(this.token.transferFrom(owner, to, amount, { from: spender }));
  //     });
  //   });
  // });

  // describe('decrease approval', function () {
  //   describe('when the spender is not the zero address', function () {
  //     const spender = recipient;

  //     describe('when the sender has enough balance', function () {
  //       const amount = 100;

  //       it('emits an approval event', async function () {
  //         const { logs } = await this.token.decreaseApproval(spender, amount, { from: owner });

  //         logs.length.should.eq(1);
  //         logs[0].event.should.eq('Approval');
  //         logs[0].args.owner.should.eq(owner);
  //         logs[0].args.spender.should.eq(spender);
  //         logs[0].args.value.should.be.bignumber.equal(0);
  //       });

  //       describe('when there was no approved amount before', function () {
  //         it('keeps the allowance to zero', async function () {
  //           await this.token.decreaseApproval(spender, amount, { from: owner });

  //           const allowance = await this.token.allowance(owner, spender);
  //           allowance.should.be.bignumber.equal(0);
  //         });
  //       });

  //       describe('when the spender had an approved amount', function () {
  //         const approvedAmount = amount;

  //         beforeEach(async function () {
  //           await this.token.approve(spender, approvedAmount, { from: owner });
  //         });

  //         it('decreases the spender allowance subtracting the requested amount', async function () {
  //           await this.token.decreaseApproval(spender, approvedAmount - 5, { from: owner });

  //           const allowance = await this.token.allowance(owner, spender);
  //           allowance.should.be.bignumber.equal(5);
  //         });

  //         it('sets the allowance to zero when all allowance is removed', async function () {
  //           await this.token.decreaseApproval(spender, approvedAmount, { from: owner });
  //           const allowance = await this.token.allowance(owner, spender);
  //           allowance.should.be.bignumber.equal(0);
  //         });

  //         it('sets the allowance to zero when more than the full allowance is removed', async function () {
  //           await this.token.decreaseApproval(spender, approvedAmount + 5, { from: owner });
  //           const allowance = await this.token.allowance(owner, spender);
  //           allowance.should.be.bignumber.equal(0);
  //         });
  //       });
  //     });

  //     describe('when the sender does not have enough balance', function () {
  //       const amount = 101;

  //       it('emits an approval event', async function () {
  //         const { logs } = await this.token.decreaseApproval(spender, amount, { from: owner });

  //         logs.length.should.eq(1);
  //         logs[0].event.should.eq('Approval');
  //         logs[0].args.owner.should.eq(owner);
  //         logs[0].args.spender.should.eq(spender);
  //         logs[0].args.value.should.be.bignumber.equal(0);
  //       });

  //       describe('when there was no approved amount before', function () {
  //         it('keeps the allowance to zero', async function () {
  //           await this.token.decreaseApproval(spender, amount, { from: owner });

  //           const allowance = await this.token.allowance(owner, spender);
  //           allowance.should.be.bignumber.equal(0);
  //         });
  //       });

  //       describe('when the spender had an approved amount', function () {
  //         beforeEach(async function () {
  //           await this.token.approve(spender, amount + 1, { from: owner });
  //         });

  //         it('decreases the spender allowance subtracting the requested amount', async function () {
  //           await this.token.decreaseApproval(spender, amount, { from: owner });

  //           const allowance = await this.token.allowance(owner, spender);
  //           allowance.should.be.bignumber.equal(1);
  //         });
  //       });
  //     });
  //   });

  //   describe('when the spender is the zero address', function () {
  //     const amount = 100;
  //     const spender = ZERO_ADDRESS;

  //     it('decreases the requested amount', async function () {
  //       await this.token.decreaseApproval(spender, amount, { from: owner });

  //       const allowance = await this.token.allowance(owner, spender);
  //       allowance.should.be.bignumber.equal(0);
  //     });

  //     it('emits an approval event', async function () {
  //       const { logs } = await this.token.decreaseApproval(spender, amount, { from: owner });

  //       logs.length.should.eq(1);
  //       logs[0].event.should.eq('Approval');
  //       logs[0].args.owner.should.eq(owner);
  //       logs[0].args.spender.should.eq(spender);
  //       logs[0].args.value.should.be.bignumber.equal(0);
  //     });
  //   });
  // });

  // describe('increase approval', function () {
  //   const amount = 100;

  //   describe('when the spender is not the zero address', function () {
  //     const spender = recipient;

  //     describe('when the sender has enough balance', function () {
  //       it('emits an approval event', async function () {
  //         const { logs } = await this.token.increaseApproval(spender, amount, { from: owner });

  //         logs.length.should.eq(1);
  //         logs[0].event.should.eq('Approval');
  //         logs[0].args.owner.should.eq(owner);
  //         logs[0].args.spender.should.eq(spender);
  //         logs[0].args.value.should.be.bignumber.equal(amount);
  //       });

  //       describe('when there was no approved amount before', function () {
  //         it('approves the requested amount', async function () {
  //           await this.token.increaseApproval(spender, amount, { from: owner });

  //           const allowance = await this.token.allowance(owner, spender);
  //           allowance.should.be.bignumber.equal(amount);
  //         });
  //       });

  //       describe('when the spender had an approved amount', function () {
  //         beforeEach(async function () {
  //           await this.token.approve(spender, 1, { from: owner });
  //         });

  //         it('increases the spender allowance adding the requested amount', async function () {
  //           await this.token.increaseApproval(spender, amount, { from: owner });

  //           const allowance = await this.token.allowance(owner, spender);
  //           allowance.should.be.bignumber.equal(amount + 1);
  //         });
  //       });
  //     });

  //     describe('when the sender does not have enough balance', function () {
  //       const amount = 101;

  //       it('emits an approval event', async function () {
  //         const { logs } = await this.token.increaseApproval(spender, amount, { from: owner });

  //         logs.length.should.eq(1);
  //         logs[0].event.should.eq('Approval');
  //         logs[0].args.owner.should.eq(owner);
  //         logs[0].args.spender.should.eq(spender);
  //         logs[0].args.value.should.be.bignumber.equal(amount);
  //       });

  //       describe('when there was no approved amount before', function () {
  //         it('approves the requested amount', async function () {
  //           await this.token.increaseApproval(spender, amount, { from: owner });

  //           const allowance = await this.token.allowance(owner, spender);
  //           allowance.should.be.bignumber.equal(amount);
  //         });
  //       });

  //       describe('when the spender had an approved amount', function () {
  //         beforeEach(async function () {
  //           await this.token.approve(spender, 1, { from: owner });
  //         });

  //         it('increases the spender allowance adding the requested amount', async function () {
  //           await this.token.increaseApproval(spender, amount, { from: owner });

  //           const allowance = await this.token.allowance(owner, spender);
  //           allowance.should.be.bignumber.equal(amount + 1);
  //         });
  //       });
  //     });
  //   });

  //   describe('when the spender is the zero address', function () {
  //     const spender = ZERO_ADDRESS;

  //     it('approves the requested amount', async function () {
  //       await this.token.increaseApproval(spender, amount, { from: owner });

  //       const allowance = await this.token.allowance(owner, spender);
  //       allowance.should.be.bignumber.equal(amount);
  //     });

  //     it('emits an approval event', async function () {
  //       const { logs } = await this.token.increaseApproval(spender, amount, { from: owner });

  //       logs.length.should.eq(1);
  //       logs[0].event.should.eq('Approval');
  //       logs[0].args.owner.should.eq(owner);
  //       logs[0].args.spender.should.eq(spender);
  //       logs[0].args.value.should.be.bignumber.equal(amount);
  //     });
  //   });
  // });

  // describe('mints new tokens', function () {
  //   const amount = 100;
  //   it('emits a transfer event', async function () {
  //     const { logs } = await this.token.mintTokens(amount, { from: owner });
  //     logs[0].args.value.should.be.bignumber.equal(amount);

  //     const supply = await this.token.totalSupply();
  //     supply.should.be.bignumber.equal(totalSupply + amount);

  //     const balance = await this.token.balanceOf(owner);
  //     balance.should.be.bignumber.equal(totalSupply + amount);
  //   });
  // });

  // describe('burn tokens', function () {
  //   describe('when the owner has enough balance', function () {
  //     const amount = 100;
  //     it('emits a transfer event', async function () {
  //       const { logs } = await this.token.burnTokens(amount, { from: owner });
  //       logs[0].args.value.should.be.bignumber.equal(amount);

  //       const supply = await this.token.totalSupply();
  //       supply.should.be.bignumber.equal(totalSupply - amount);

  //       const balance = await this.token.balanceOf(owner);
  //       balance.should.be.bignumber.equal(totalSupply - amount);
  //     });
  //   });

  //   describe('when the owner does has enough balance', function () {
  //     const amount = totalSupply + 1;
  //     it('reverts', async function () {
  //       await assertRevert(this.token.burnTokens(amount, { from: owner }));
  //     });
  //   });
  // });

  // describe('pauses all functions of the token contract', function () {
  //   it('emits a pause event', async function () {
  //     const { logs } = await this.token.pause({ from: owner });
  //     logs[0].event.should.be.eq('Pause');

  //     await assertRevert(this.token.transfer(ZERO_ADDRESS, 10, { from: owner }));
  //   });
  // });

  // describe('transfers ownership of storage contract', function () {
  //   it('emits a transfer event', async function () {
  //     let newAddress = "0x2da27deabde2d64f3db9d7302add3b431d342bc0"
  //     const { logs } = await this.token.transferStorageOwnership(newAddress, { from: owner });
  //     logs[0].args.newOwner.should.be.bignumber.equal(newAddress);

  //     const newOwner = await this.token.storageOwner();
  //     newOwner.should.be.eq(newAddress);

  //     await assertRevert(this.token.burnTokens(10, { from: owner }));
  //   });
  // });

  // describe('kills the token contract', function () {
  //   describe('when the ownership has not been transferred', function () {
  //     it('reverts', async function () {
  //       await assertRevert(this.token.killContract({ from: owner }));
  //     });
  //   });

  //   describe('after ownership has been transferred', function () {
  //     it('destroys the contract', async function () {
  //       let newAddress = "0x2da27deabde2d64f3db9d7302add3b431d342bc0"
  //       const { logs } = await this.token.transferStorageOwnership(newAddress, { from: owner });
  //       logs[0].args.newOwner.should.be.bignumber.equal(newAddress);

  //       await this.token.killContract({ from: owner })
  //     })
  //   });
  // });
});