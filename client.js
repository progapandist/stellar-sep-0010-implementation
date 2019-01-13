const stellar = require("stellar-sdk");
const request = require("request");
const toml    = require("toml");

stellar.Network.useTestNetwork();

// Base url for Stellar.toml
const DOMAIN = "http://localhost:3000";

// Our (client) Stellar::Keypair we will use to sign challenge transaction.
const CLIENT_KEY_PAIR = stellar.Keypair.fromSecret(process.env.CLIENT_PRIVATE_KEY);

request(`${DOMAIN}/.well-known/Stellar.toml`, (err, res, body) => {
  if (err) { return console.log(err); }

  const config = toml.parse(body);

  // Auth endpoint
  const ENDPOINT = config.WEB_AUTH_ENDPOINT;

  // Server Stellar::Keypair, we use it to check server signature.
  const SERVER_KEY_PAIR = stellar.Keypair.fromPublicKey(config.WEB_AUTH_ACCOUNT);

  // Request challenge transaction
  request(`${ENDPOINT}?public_key=${CLIENT_KEY_PAIR.publicKey()}`, { json: true }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }

    console.log("Challenge transaction XDR:", body.transaction);

    // Parse transaction XDR
    const tx = new stellar.Transaction(body.transaction);
    const { signatures } = tx;
    const hash = tx.hash();

    // Transaction shoud contain signature made by server private key and it must be valid. This check ensures
    // that challenge tranasaction was generated by the owner of the key.
    const valid = signatures.some(signature =>
      SERVER_KEY_PAIR.verify(hash, signature.signature())
    );

    if (!valid) {
      return console.log("Server signature not found");
    }

    // Sign transaction with our key
    tx.sign(CLIENT_KEY_PAIR);
    const signed = tx.toEnvelope().toXDR("base64");

    // Request access token
    request.post({ url: ENDPOINT, form: { transaction: signed } }, (err, res, body) => {
      console.log(body);
    });
  });
});
