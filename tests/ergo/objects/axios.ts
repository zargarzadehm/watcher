import MockAdapter from 'axios-mock-adapter';
import { explorerApi, nodeClient } from '../../../src/ergo/network/ergoNetwork';
import { mockedResponseBody } from './mockedResponseBody';

const mockedExplorer = new MockAdapter(explorerApi);
const mockedNodeClient = new MockAdapter(nodeClient);
export const boxId =
  '95f1165089b39f91b096e1dec1d1d55acb4f7e821df0656f5ad3c633e370d065';
export const unconfirmedTxId =
  'ebb5aa196e64e28a04eda4f5e25ac9e2bf883af1f5a1e63b1429b2e14c6b0dcb';
export const confirmedTxId =
  '55ba303658d4054cfa235320ee09193c8e1b6c96b3e5473f660dbb5f1b99c2b7';
export const unavailableTxId =
  '8b7ae20a4acd23e3f1bf38671ce97103ad96d8f1c780b5e5e865e4873ae16337';
export const spentBoxId =
  '87e570115b46cee9d02149aadbb34fddb0804c91f000149c3bba91a0f3f93d58';
export const notSpentBoxId =
  '99d53115caf4d19b74275ac092f6a8fb68921af5d3dca15ec809e47fde10c36c';

export const initMockedAxios = (vector = 0) => {
  mockedNodeClient.reset();
  mockedExplorer.reset();
  switch (vector) {
    case 0: {
      mockedExplorer
        .onGet(
          '/api/v1/boxes/unspent/byErgoTree/10130400040004040400040204000e20a40b86c663fbbfefa243c9c6ebbc5690fc4e385f15b44c49ba469c91c5af0f480404040004000400010104020400040004000e20872fee02938af6c93dff43049ec61b379e75c059b05f39304b3f1ce50cf3ad9305020101d807d601b2a5730000d6028cb2db6308a773010001d603aeb5b4a57302b1a5d901036391b1db630872037303d9010363aedb63087203d901054d0e938c7205017202d604e4c6a7041ad605b2a5730400d606db63087205d607ae7206d901074d0e938c720701720295938cb2db63087201730500017306d196830301ef7203938cb2db6308b2a473070073080001b2720473090095720796830201938cb27206730a0001720293c27205c2a7730bd801d608c2a7d196830501ef720393c27201720893e4c67201041a7204938cb2db6308b2a4730c00730d0001b27204730e00957207d801d609b27206730f0096830701938c720901720293cbc272057310e6c67205051ae6c67205060e93e4c67205070ecb720893e4c67205041a7204938c72090273117312',
          { params: { offset: 0, limit: 1 } }
        )
        .reply(200, [mockedResponseBody.watcherPermitLastBox]);

      mockedExplorer
        .onGet(
          '/api/v1/boxes/unspent/byErgoTree/10130400040004040400040204000e20a40b86c663fbbfefa243c9c6ebbc5690fc4e385f15b44c49ba469c91c5af0f480404040004000400010104020400040004000e20872fee02938af6c93dff43049ec61b379e75c059b05f39304b3f1ce50cf3ad9305020101d807d601b2a5730000d6028cb2db6308a773010001d603aeb5b4a57302b1a5d901036391b1db630872037303d9010363aedb63087203d901054d0e938c7205017202d604e4c6a7041ad605b2a5730400d606db63087205d607ae7206d901074d0e938c720701720295938cb2db63087201730500017306d196830301ef7203938cb2db6308b2a473070073080001b2720473090095720796830201938cb27206730a0001720293c27205c2a7730bd801d608c2a7d196830501ef720393c27201720893e4c67201041a7204938cb2db6308b2a4730c00730d0001b27204730e00957207d801d609b27206730f0096830701938c720901720293cbc272057310e6c67205051ae6c67205060e93e4c67205070ecb720893e4c67205041a7204938c72090273117312',
          { params: { offset: 0, limit: 10 } }
        )
        .reply(200, [mockedResponseBody.watcherPermitLast10Boxes]);

      mockedExplorer
        .onGet(
          '/api/v1/boxes/unspent/byErgoTree/101c040204000e20a6ac381e6fa99929fd1477b3ba9499790a775e91d4c14c5aa86e9a118dfac8530101040204000402040404040400040004020402040204000400040004000e2013fe3ae277a195b83048e3e268529118fa4c18cca0931e3b48a8f5fccec75bc9040404000400040204020400040004000400d801d601b2a473000095938cb2db63087201730100017302d17303d811d602db6308a7d603b27202730400d6048c720302d605b2a5730500d606db63087205d607b27206730600d6088c720702d609e4c6a70511d60ab17209d60be4c672050511d60cb1720bd60de4c6a70611d60eb27206730700d60f8c720e02d610b27202730800d6118c721002d6129683050193c27205c2a793e4c672050611720d938cb27206730900018cb27202730a0001938c7207018c720301938c720e018c721001959172047208d806d613e4c67205041ad6149a720a730bd61599720c730cd616c5a7d6179972047208d618b2a5730d00d196830c01721293b17213721493b47213730e7215e4c6a7041a93b27213721500721693720c721493b4720b730f7215720993b2720b7215007217939c7217b2720d73100099720f7211938cb2db6308721873110002721793cbc27218731293e4c67218041a83010e7216938cb2db6308b2a5731300731400017216d804d613e4c6a7041ad614e4c672050704d6159972087204d616b27209721400d19683040172129383010eb27213721400e4c67201041a939c7215b2720d731500997211720f959172167215968302019372169ab2720b7214007215937213e4c67205041ad803d617e4c67205041ad6189a72147316d61999720a731796830501937216721593b4721373187214b472177319721493b472137218720ab472177214721993b47209731a7214b4720b731b721493b472097218720ab4720b72147219',
          { params: { offset: 0, limit: 1 } }
        )
        .reply(200, [mockedResponseBody.repoLastBox]);

      mockedExplorer
        .onGet(
          '/api/v1/boxes/unspent/byErgoTree/101c040204000e20a6ac381e6fa99929fd1477b3ba9499790a775e91d4c14c5aa86e9a118dfac8530101040204000402040404040400040004020402040204000400040004000e2013fe3ae277a195b83048e3e268529118fa4c18cca0931e3b48a8f5fccec75bc9040404000400040204020400040004000400d801d601b2a473000095938cb2db63087201730100017302d17303d811d602db6308a7d603b27202730400d6048c720302d605b2a5730500d606db63087205d607b27206730600d6088c720702d609e4c6a70511d60ab17209d60be4c672050511d60cb1720bd60de4c6a70611d60eb27206730700d60f8c720e02d610b27202730800d6118c721002d6129683050193c27205c2a793e4c672050611720d938cb27206730900018cb27202730a0001938c7207018c720301938c720e018c721001959172047208d806d613e4c67205041ad6149a720a730bd61599720c730cd616c5a7d6179972047208d618b2a5730d00d196830c01721293b17213721493b47213730e7215e4c6a7041a93b27213721500721693720c721493b4720b730f7215720993b2720b7215007217939c7217b2720d73100099720f7211938cb2db6308721873110002721793cbc27218731293e4c67218041a83010e7216938cb2db6308b2a5731300731400017216d804d613e4c6a7041ad614e4c672050704d6159972087204d616b27209721400d19683040172129383010eb27213721400e4c67201041a939c7215b2720d731500997211720f959172167215968302019372169ab2720b7214007215937213e4c67205041ad803d617e4c67205041ad6189a72147316d61999720a731796830501937216721593b4721373187214b472177319721493b472137218720ab472177214721993b47209731a7214b4720b731b721493b472097218720ab4720b72147219',
          { params: { offset: 0, limit: 10 } }
        )
        .reply(200, [mockedResponseBody.repoLast10Boxes]);

      break;
    }
    case 1: {
      mockedExplorer
        .onGet(
          '/api/v1/boxes/unspent/byErgoTree/10130400040004040400040204000e20a40b86c663fbbfefa243c9c6ebbc5690fc4e385f15b44c49ba469c91c5af0f480404040004000400010104020400040004000e20872fee02938af6c93dff43049ec61b379e75c059b05f39304b3f1ce50cf3ad9305020101d807d601b2a5730000d6028cb2db6308a773010001d603aeb5b4a57302b1a5d901036391b1db630872037303d9010363aedb63087203d901054d0e938c7205017202d604e4c6a7041ad605b2a5730400d606db63087205d607ae7206d901074d0e938c720701720295938cb2db63087201730500017306d196830301ef7203938cb2db6308b2a473070073080001b2720473090095720796830201938cb27206730a0001720293c27205c2a7730bd801d608c2a7d196830501ef720393c27201720893e4c67201041a7204938cb2db6308b2a4730c00730d0001b27204730e00957207d801d609b27206730f0096830701938c720901720293cbc272057310e6c67205051ae6c67205060e93e4c67205070ecb720893e4c67205041a7204938c72090273117312',
          { params: { offset: 0, limit: 1 } }
        )
        .reply(200, [mockedResponseBody.thirdWatcherLastPermitBox]);

      mockedExplorer
        .onGet(
          '/api/v1/boxes/unspent/byErgoTree/10130400040004040400040204000e20a40b86c663fbbfefa243c9c6ebbc5690fc4e385f15b44c49ba469c91c5af0f480404040004000400010104020400040004000e20872fee02938af6c93dff43049ec61b379e75c059b05f39304b3f1ce50cf3ad9305020101d807d601b2a5730000d6028cb2db6308a773010001d603aeb5b4a57302b1a5d901036391b1db630872037303d9010363aedb63087203d901054d0e938c7205017202d604e4c6a7041ad605b2a5730400d606db63087205d607ae7206d901074d0e938c720701720295938cb2db63087201730500017306d196830301ef7203938cb2db6308b2a473070073080001b2720473090095720796830201938cb27206730a0001720293c27205c2a7730bd801d608c2a7d196830501ef720393c27201720893e4c67201041a7204938cb2db6308b2a4730c00730d0001b27204730e00957207d801d609b27206730f0096830701938c720901720293cbc272057310e6c67205051ae6c67205060e93e4c67205070ecb720893e4c67205041a7204938c72090273117312',
          { params: { offset: 0, limit: 10 } }
        )
        .reply(200, [mockedResponseBody.thirdWatcherLast10PermitBox]);

      mockedExplorer
        .onGet(
          '/api/v1/boxes/unspent/byErgoTree/101c040204000e20a6ac381e6fa99929fd1477b3ba9499790a775e91d4c14c5aa86e9a118dfac8530101040204000402040404040400040004020402040204000400040004000e2013fe3ae277a195b83048e3e268529118fa4c18cca0931e3b48a8f5fccec75bc9040404000400040204020400040004000400d801d601b2a473000095938cb2db63087201730100017302d17303d811d602db6308a7d603b27202730400d6048c720302d605b2a5730500d606db63087205d607b27206730600d6088c720702d609e4c6a70511d60ab17209d60be4c672050511d60cb1720bd60de4c6a70611d60eb27206730700d60f8c720e02d610b27202730800d6118c721002d6129683050193c27205c2a793e4c672050611720d938cb27206730900018cb27202730a0001938c7207018c720301938c720e018c721001959172047208d806d613e4c67205041ad6149a720a730bd61599720c730cd616c5a7d6179972047208d618b2a5730d00d196830c01721293b17213721493b47213730e7215e4c6a7041a93b27213721500721693720c721493b4720b730f7215720993b2720b7215007217939c7217b2720d73100099720f7211938cb2db6308721873110002721793cbc27218731293e4c67218041a83010e7216938cb2db6308b2a5731300731400017216d804d613e4c6a7041ad614e4c672050704d6159972087204d616b27209721400d19683040172129383010eb27213721400e4c67201041a939c7215b2720d731500997211720f959172167215968302019372169ab2720b7214007215937213e4c67205041ad803d617e4c67205041ad6189a72147316d61999720a731796830501937216721593b4721373187214b472177319721493b472137218720ab472177214721993b47209731a7214b4720b731b721493b472097218720ab4720b72147219',
          { params: { offset: 0, limit: 1 } }
        )
        .reply(200, [mockedResponseBody.thirdRepoBox]);

      mockedExplorer
        .onGet(
          '/api/v1/boxes/unspent/byErgoTree/101c040204000e20a6ac381e6fa99929fd1477b3ba9499790a775e91d4c14c5aa86e9a118dfac8530101040204000402040404040400040004020402040204000400040004000e2013fe3ae277a195b83048e3e268529118fa4c18cca0931e3b48a8f5fccec75bc9040404000400040204020400040004000400d801d601b2a473000095938cb2db63087201730100017302d17303d811d602db6308a7d603b27202730400d6048c720302d605b2a5730500d606db63087205d607b27206730600d6088c720702d609e4c6a70511d60ab17209d60be4c672050511d60cb1720bd60de4c6a70611d60eb27206730700d60f8c720e02d610b27202730800d6118c721002d6129683050193c27205c2a793e4c672050611720d938cb27206730900018cb27202730a0001938c7207018c720301938c720e018c721001959172047208d806d613e4c67205041ad6149a720a730bd61599720c730cd616c5a7d6179972047208d618b2a5730d00d196830c01721293b17213721493b47213730e7215e4c6a7041a93b27213721500721693720c721493b4720b730f7215720993b2720b7215007217939c7217b2720d73100099720f7211938cb2db6308721873110002721793cbc27218731293e4c67218041a83010e7216938cb2db6308b2a5731300731400017216d804d613e4c6a7041ad614e4c672050704d6159972087204d616b27209721400d19683040172129383010eb27213721400e4c67201041a939c7215b2720d731500997211720f959172167215968302019372169ab2720b7214007215937213e4c67205041ad803d617e4c67205041ad6189a72147316d61999720a731796830501937216721593b4721373187214b472177319721493b472137218720ab472177214721993b47209731a7214b4720b731b721493b472097218720ab4720b72147219',
          { params: { offset: 0, limit: 10 } }
        )
        .reply(200, [mockedResponseBody.thirdRepoBox]);
      break;
    }
  }
  mockedNodeClient
    .onGet('/blocks/lastHeaders/10')
    .reply(200, mockedResponseBody.last10BlockHeaders);

  mockedNodeClient.onGet('/info').reply(200, mockedResponseBody.networkInfo);

  mockedNodeClient
    .onPost('/transactions')
    .reply((config) =>
      config.data === mockedResponseBody.sampleTxJson
        ? [200, mockedResponseBody.sampleTxId]
        : [400, 'error']
    );

  mockedNodeClient
    .onGet(`utxo/byId/${boxId}`)
    .reply(200, mockedResponseBody.utxo);

  mockedExplorer
    .onGet(`/api/v1/boxes/${boxId}`)
    .reply(200, mockedResponseBody.utxo);

  mockedExplorer
    .onGet(
      '/api/v1/boxes/unspent/byAddress/9hwWcMhrebk4Ew5pBpXaCJ7zuH8eYkY9gRfLjNP3UeBYNDShGCT'
    )
    .reply(200, mockedResponseBody.watcherUnspentBoxes);

  mockedExplorer
    .onGet(
      '/api/v1/mempool/transactions/byAddress/N9nHZxAm7Z476Nbw6yF2X6BQEct7nNCm4SJeCK8DJEkERj6LXMJvKqG49WWSfNDufuuFEtN8msfWDd8UR4QUCmLEwFRWXC5hxEdk1XhdRSgiwuqyiPqpSTXtqUgGf67uCzEtHtN5nQKKuRYyr6xfFfV8YXKhms5JVqhmCM9869Nr4KzmLAdSLqwG6LswnFwRWwZZfC6Jf65RKV4xV5GTDqL5Ppc2QwnGDYFEUPPgLdskLbDAgwfDgE2mZnCfovUGmCjinh8UD1tW3AKfBPjFJbdF6eST8SB7EpDt162cZu7992Gaa3jNYwYnJKGKqU1izwb2WRVC3yXSHFQxr8GkTa3uQ9WAL1hyMSSNg7GqzF5a8GXFUTCw97zXUevKjtBAKxmjLQTfsmDdzYTe1oBNXEgffhVndtxhCfViYbnHVHUqEv8NQA8xiZaEzj9eCfrYyPepiq1sRruFwgjqhqhpetrQaKcSXmFjeFzCHnDR3aAV9dXQr6SyqAf7p7ML9H4rYNhLJAc4Usbuq8rVH8ysmTZPb7erhWmKXG8yFWqc6mE6tekXUuyvPhh3uXJWZgc6Z2RDbDNRvZNkxbUMDEDfb3iLtcNd3wGGLFndzryQNft8FZS4xwaskVZFQkFga3dfCgkMv3NAXrRTPmrDYD2WgurR8PfewJAJ2nu4GpMJadgTkkkLYvgrVxC8jp3w39dXzSCKAcQ7cGWyvYW6HK1s1VcG9QiogDf6YhM5mfroCCn6HweQ7hDdYtRvSyuDBVaZAJmhxKBffsGsApKocqPeZMjo8hsRr3bWgJA2xBhzxn42HCgDf2qULBH4b9HN5N3hyR7WURyVr9Y1vXwFTakEtMsr861X88mi2yUi7aqRh3XAFoN11Do9N34UPSzreELFk3SCxJT4uAdsKQrCm5yRo1zt5Mgh4tpHfgk4SsY7'
    )
    .reply(200, mockedResponseBody.repoBoxMemPool);

  mockedExplorer
    .onGet(
      '/api/v1/mempool/transactions/byAddress/9iAEDf2b4J5T1QSAPStkSbSzNUUW38cy8EMJkKC3cxHCBoaQYfY'
    )
    .reply(200, mockedResponseBody.mempoolTxs);

  mockedExplorer
    .onGet(
      '/api/v1/mempool/transactions/byAddress/9eYicprScbobMdmWYRHwbYiM3g19EQ3iAK24FconvXFVfaEooVH'
    )
    .reply(200, mockedResponseBody.mempoolTxs2);

  mockedExplorer
    .onGet(
      '/api/v1/mempool/transactions/byAddress/jL2aaqw6XU61SZznvcri5VZnx1Gn8hfZWK87JH6PM7o1YMDMZfpH1uoGJSd3gDQabX6AmCZKLyMSBqSoUAo8X7E5oNRV9JgCdLBFjV6i1BEjZLwgGo3RUr4p8zchqrJ1FeGPLf2DidW6F41aeM1zCM64ZjfBqcy8d6fgEnAn53W28GEDQi5W1XCWRjFvgTFuDdAzd6Yj65KGJhdvMSgffP7pELpCtqK5Z4dX9SQKtt8Y4RMBaeEKtKB1pEx1n'
    )
    .reply(200, mockedResponseBody.mempoolTxs3);

  mockedExplorer
    .onGet(
      '/api/v1/mempool/transactions/byAddress/9h4gxtzV1f8oeujQUA5jeny1mCUCWKrCWrFUJv6mgxsmp5RxGb9'
    )
    .reply(200, mockedResponseBody.emptyMempool);

  mockedExplorer
    .onGet(
      '/api/v1/boxes/unspent/byErgoTree/0008cd03c880d703131f301badf289ceb9b7f86d674e8cbe390461f66e844f507571a1d6',
      { params: { offset: 0, limit: 1 } }
    )
    .reply(200, mockedResponseBody.firstWatcherLastUnspentBox);

  mockedExplorer
    .onGet(
      '/api/v1/boxes/unspent/byErgoTree/0008cd034f355bdcb7cc0af728ef3cceb9615d90684bb5b2ca5f859ab0f0b704075871aa',
      { params: { offset: 0, limit: 1 } }
    )
    .reply(200, mockedResponseBody.thirdWatcherLastUnspentBox);

  mockedExplorer
    .onGet(
      '/api/v1/boxes/unspent/byErgoTree/0008cd034f355bdcb7cc0af728ef3cceb9615d90684bb5b2ca5f859ab0f0b704075871aa',
      { params: { offset: 0, limit: 10 } }
    )
    .reply(200, mockedResponseBody.thirdWatcherLastUnspentBox);

  mockedExplorer
    .onGet(
      '/api/v1/boxes/unspent/byErgoTree/0008cd03c880d703131f301badf289ceb9b7f86d674e8cbe390461f66e844f507571a1d6',
      { params: { offset: 1, limit: 1 } }
    )
    .reply(200, mockedResponseBody.emptyAddressBox);

  mockedExplorer
    .onGet(
      '/api/v1/boxes/unspent/byErgoTree/0008cd03c880d703131f301badf289ceb9b7f86d674e8cbe390461f66e844f507571a1d6',
      { params: { offset: 0, limit: 10 } }
    )
    .reply(200, [mockedResponseBody.firstWatcherLast10UnspentBoxes]);

  mockedExplorer
    .onGet(
      '/api/v1/boxes/unspent/byErgoTree/0008cd03c29ad59831be2e5baded45a03ce9a7d4c2e83d683e11c79790e76f640d0d3e30',
      { params: { offset: 0, limit: 1 } }
    )
    .reply(200, [mockedResponseBody.secondWatcherLastUnspentBox]);

  mockedExplorer
    .onGet(
      '/api/v1/boxes/unspent/byErgoTree/0008cd03c29ad59831be2e5baded45a03ce9a7d4c2e83d683e11c79790e76f640d0d3e30',
      { params: { offset: 0, limit: 10 } }
    )
    .reply(200, [mockedResponseBody.secondWatcherLast10UnspentBox]);

  mockedExplorer
    .onGet(`/api/v0/transactions/unconfirmed/${unconfirmedTxId}`)
    .reply(200, mockedResponseBody.unConfirmedTx);

  mockedExplorer
    .onGet(`/api/v1/transactions/${unconfirmedTxId}`)
    .reply(404, { status: 404 });

  mockedExplorer
    .onGet(`/api/v0/transactions/unconfirmed/${confirmedTxId}`)
    .reply(404, { status: 404 });

  mockedExplorer
    .onGet(`/api/v1/transactions/${confirmedTxId}`)
    .reply(200, mockedResponseBody.confirmedTx);

  mockedExplorer
    .onGet(`/api/v0/transactions/unconfirmed/${unavailableTxId}`)
    .reply(404, { status: 404 });

  mockedExplorer
    .onGet(`/api/v1/transactions/${unavailableTxId}`)
    .reply(404, { status: 404 });

  mockedNodeClient
    .onGet(`utxo/byId/${spentBoxId}`)
    .reply(404, { status: 404, reason: 'not-found' });

  mockedNodeClient
    .onGet(`utxo/byId/${notSpentBoxId}`)
    .reply(200, mockedResponseBody.utxo);
};
