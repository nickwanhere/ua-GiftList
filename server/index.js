const express = require("express");
const verifyProof = require("../utils/verifyProof");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const merkleTree = new MerkleTree(niceList);

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;

  const proof = body.proof;
  const name = body.name;
  const root = merkleTree.getRoot();

  // TODO: prove that a name is in the list
  let isInTheList = false;

  if (verifyProof(proof, name, root)) {
    isInTheList = true;
  }
  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
