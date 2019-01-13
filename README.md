# Stellar SEP-0010 implementation

https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0010.md

Examples for https://evilmartians.com/chronicles/blockchain-authentication

## Installation

```
git clone https://github.com/gzigzigzeo/stellar-sep-0010-implementation && yarn install
```

## Running server

```
  SERVER_PRIVATE_KEY=SDR2Z3UYCLOD3IPACJXXSBWPPULDMZ3UUS3VUB7BB5MGQMC54F2MMWWS \
  ALLOWED_ACCOUNTS=GAZQFKRTG2LBDG5ARWL4MZ2QLNVZYQHRR7K7RPH2BQAPTSF7MXOMVWXO \
  JWT_SECRET=secret \
  node index.js
```

## Running client

```
  CLIENT_PRIVATE_KEY=SDY7TC3KMMNP25QMEKQJTQUNXJCDHYXUTWAELRN2HKXHF2BDD5JDOTBJ node client.js
```
