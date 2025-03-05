import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletConnection, WalletMultiButton } from "./walletConnection";
import { checkBalance } from "./balanceCheck";
import { swapTokens } from "./tokenSwap";

const App = () => {
    const { publicKey, sendTransaction } = useWallet();
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(0);
    const [selectedToken, setSelectedToken] = useState("USDT");

    useEffect(() => {
        if (publicKey) fetchBalance();
    }, [publicKey, selectedToken]);

    const fetchBalance = async () => {
        if (publicKey) {
            const userBalance = await checkBalance(publicKey, selectedToken === "USDT" ? USDT_MINT : USDC_MINT);
            setBalance(userBalance);
        }
    };

    const handleSwap = async () => {
        try {
            const signature = await swapTokens(publicKey, sendTransaction, amount, selectedToken);
            alert(`Transaction successful! Signature: ${signature}`);
            fetchBalance();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <WalletConnection>
            <div className="flex flex-col items-center p-6">
                <WalletMultiButton />
                <div className="mt-4">
                    <label className="mr-2">Select Token:</label>
                    <select value={selectedToken} onChange={(e) => setSelectedToken(e.target.value)}>
                        <option value="USDT">USDT</option>
                        <option value="USDC">USDC</option>
                    </select>
                </div>
                <button className="mt-2 bg-gray-500 text-white p-2 rounded" onClick={fetchBalance}>
                    Check Balance: {balance} {selectedToken}
                </button>
                <input 
                    type="number" 
                    className="mt-4 p-2 border rounded" 
                    placeholder="Amount" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                />
                <button className="mt-4 bg-blue-500 text-white p-2 rounded" onClick={handleSwap}>
                    Swap {selectedToken}
                </button>
            </div>
        </WalletConnection>
    );
};

export default App;
