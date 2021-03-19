const Client = require('rippled-ws-client')
const SignAndSubmit = require('rippled-ws-client-sign')

// XRPL Testnet faucet:
//    https://xrpl.org/xrp-testnet-faucet.html
//    Sample testnet account:
//       Account (public) address: rH2ycSQ5k8nJc95bSWyF5T53GLdV1HwzSd
//       Secret (family seed):     snS1wcfugBtdfPAePbCYq6JH2Sw5V

const account = {
  secret: 'snS1wcfugBtdfPAePbCYq6JH2Sw5V',
  account: 'rH2ycSQ5k8nJc95bSWyF5T53GLdV1HwzSd'
}

const main = async () => {
  console.log('Connecting to the XRPL')
  // Livenet:
  // const connection = await new Client('wss://xrplcluster.com')
  // Testnet:
  const connection = await new Client('wss://testnet.xrpl-labs.com')
  console.log('Connected')

  const transaction = {
    TransactionType: 'Payment',
    Account: 'rH2ycSQ5k8nJc95bSWyF5T53GLdV1HwzSd',
    Destination: 'rwietsevLFg8XSmG3bEZzFein1g8RBqWDZ',
    // Amount in drops (1 XRP = one million drops), so multiply by one million (6 decimal positions) for 1 XRP
    Amount: 1,
    Memos: [
      { 
        Memo: {
          MemoType: Buffer.from('SomeMemo', 'utf-8').toString('hex').toUpperCase(),
          MemoData: Buffer.from('This is free form text, but can be HEX 🎉', 'utf-8').toString('hex').toUpperCase()
        }
      },
    ]
  }

  console.log('Signing & submitting and waiting for finality')
  const txResult = await new SignAndSubmit(transaction, account.secret, connection)
  console.log('Finality (tx result):')
  console.log(txResult)
  console.log('View the TX (explorer):', 'https://testnet.xrpl.org/transactions/' + txResult.hash + '/raw')

  console.log('Closing connection')
  connection.close()
  console.log('Closed')
}

main()
