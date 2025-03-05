import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const SOLANA_RPC = "https://api.mainnet-beta.solana.com";
const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

const WalletConnection = ({ children }) => (
    <ConnectionProvider endpoint={SOLANA_RPC}>
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
                {children}
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
);

export { WalletConnection, WalletMultiButton };
