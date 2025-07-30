import { ethers } from "ethers";

export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      alert("MetaMask is not installed");
      return null;
    }

    // Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Create a provider and signer
    const provider = new ethers.BrowserProvider(window.ethereum); // v6 syntax
    const signer = await provider.getSigner();

    return {
      signer,
      address: accounts[0],
      provider,
    };
  } catch (err) {
    console.error("Wallet connection failed:", err);
    return null;
  }
};

export const signInvoice = async (signer, invoiceData) => {
  try {
    const message = JSON.stringify(invoiceData);
    const signature = await signer.signMessage(message);
    return signature;
  } catch (err) {
    console.error("Signing failed:", err);
    return null;
  }
};








