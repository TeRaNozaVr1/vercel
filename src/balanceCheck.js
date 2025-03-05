import { Connection, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress } from "@solana/spl-token";

const SOLANA_RPC = "https://api.mainnet-beta.solana.com";
const connection = new Connection(SOLANA_RPC);

const checkBalance = async (publicKey, tokenMint) => {
    if (!publicKey) return 0;
    try {
        const ata = await getAssociatedTokenAddress(tokenMint, publicKey);
        const accountInfo = await connection.getTokenAccountBalance(ata).catch(() => null);
        return accountInfo ? accountInfo.value.uiAmount : 0;
    } catch (error) {
        console.error("Error checking balance:", error);
        return 0;
    }
};

export { checkBalance };
