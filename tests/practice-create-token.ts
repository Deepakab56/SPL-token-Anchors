import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PracticeCreateToken } from "../target/types/practice_create_token";
import { Keypair } from "@solana/web3.js";
describe("practice-create-token", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace
    .practiceCreateToken as Program<PracticeCreateToken>;

  it("Is initialized!", async () => {
    const metadata = {
      tokenDecimals: 9,
      name: "Zinda",
      symbol: "zindi",
      uri: "https://gateway.pinata.cloud/ipfs/Qmerj6Mu5jxoHYsVHoW68edpEBSK74T4VnhCJioUwASZK2",
    };

    const mintKeypair = Keypair.generate();

    const transactionSignature = await program.methods
      .createTokenMint(9, metadata.name, metadata.symbol, metadata.uri)
      .accounts({
        payer: payer.publicKey,
        mintAccount: mintKeypair.publicKey,
      })
      .signers([mintKeypair])
      .rpc();

    console.log(transactionSignature);
  });
});
