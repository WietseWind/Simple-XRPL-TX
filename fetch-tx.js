const Client = require('rippled-ws-client')
const SignAndSubmit = require('rippled-ws-client-sign')

const main = async () => {
  console.log('Connecting to the XRPL')
  // Livenet:
  // const connection = await new Client('wss://xrplcluster.com')
  // Testnet:
  const connection = await new Client('wss://testnet.xrpl-labs.com')
  console.log('Connected')

  console.log('Fetching transaction')
  const transaction = await connection.send({
    command: 'tx',
    transaction: 'AE7E186B4FAB4552DCD61C1F5DBFC876029F85EDD5C746F20D9B4279490B89AC'
  })

  console.log(transaction)
  console.log(Object.values(transaction.Memos[0].Memo).map(r => Buffer.from(r, 'hex').toString('utf-8')))

  console.log('Closing connection')
  connection.close()
  console.log('Closed')
}

main()
