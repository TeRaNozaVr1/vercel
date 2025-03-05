import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { getAssociatedTokenAddress, createTransferInstruction } from "@solana/spl-token";

const SOLANA_RPC = "https://api.mainnet-beta.solana.com";
const connection = new Connection(SOLANA_RPC);

const USDT_MINT = new PublicKey("Es9vMFrzaCERWb3gizuwQpKJp2G5JD5ozjBWhkmQP9iA");
const USDC_MINT = new PublicKey("4ofLfgCmaJYC233vTGv78WFD4AfezzcMiViu26dF3cVU");
const RECEIVER_WALLET = new PublicKey("4ofLfgCmaJYC233vTGv78WFD4AfezzcMiViu26dF3cVU");
const TOKEN_TO_SEND = new PublicKey("3EwV6VTHYHrkrZ3UJcRRAxnuHiaeb8EntqX85Khj98Zo");

const swapTokens = async (publicKey, sendTransaction, amount, selectedToken) => {
    if (!publicKey) throw new Error("Wallet not connected");
    if (amount <= 0) throw new Error("Amount must be greater than zero");
    
    const TOKEN_MINT = selectedToken === "USDT" ? USDT_MINT : USDC_MINT;
    const payerATA = await getAssociatedTokenAddress(TOKEN_MINT, publicKey);
    const receiverATA = await getAssociatedTokenAddress(TOKEN_MINT, RECEIVER_WALLET);
    
    const transferInstruction = createTransferInstruction(payerATA, receiverATA, publicKey, amount * 1e6);
    
    const transaction = new Transaction().add(transferInstruction);
    transaction.feePayer = publicKey;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    
    const signature = await sendTransaction(transaction, connection);
    return signature;
};

export { swapTokens };
