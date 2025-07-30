import { useState } from "react";
import { connectWallet, signInvoice } from "../web3";

const WalletConnect = ({ invoice }) => {
  const [address, setAddress] = useState(null);
  const [signature, setSignature] = useState(null);

  const handleConnect = async () => {
    const signer = await connectWallet();
    const addr = await signer.getAddress();
    setAddress(addr);
    const sig = await signInvoice(signer, invoice);
    setSignature(sig);
  };

  if (!invoice) return null;

  return (
    <div className="mt-4">
      {!address ? (
        <button onClick={handleConnect} className="bg-green-600 text-white px-4 py-2 rounded">
          Connect Wallet & Sign
        </button>
      ) : (
        <div>
          <p className="text-sm">Signed by: {address}</p>
          <p className="text-sm break-all">Signature: {signature}</p>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
