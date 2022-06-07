export default {
    node: {
        URL: "https://testnet.koios.rest/api/v0",
    },
    cardano: {
        interval: 10,
        initialBlockHeight: 3471392,
    },
    ergo: {
        explorerUrl: "http://10.10.9.3:7000",
        nodeUrl: "http://10.10.9.3:9064",
        networkType: "Mainnet",
        watcherSecretKey: "b3a6478ffd4a75a79463507552aeb052faf456e862a48f776ca21167cc1db3a8",
        RWTId: "3c6cb596273a737c3e111c31d3ec868b84676b7bad82f9888ad574b44edef267",
        repoNFT: "a40b86c663fbbfefa243c9c6ebbc5690fc4e385f15b44c49ba469c91c5af0f48",
    },
    commitmentScanner: {
        interval: 10,
        initialBlockHeight: 208640,
        heightLimit: 100,
        cleanupConfirmation: 10,
    },
};

