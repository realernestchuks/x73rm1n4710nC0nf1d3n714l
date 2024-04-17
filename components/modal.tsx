import { ReactNode } from 'react';
import Image from 'next/image';
import{ConnectButton,darkTheme,useActiveAccount,useActiveWalletConnectionStatus,useActiveWalletChain,useSwitchActiveWalletChain} from "thirdweb/react";
import {createWallet,walletConnect,privateKeyAccount} from "thirdweb/wallets";
import {ethereum,polygon,optimism,arbitrum,avalanche,base,defineChain} from "thirdweb/chains";
import { createThirdwebClient } from 'thirdweb';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    chainList?: any[];
    modalId: number;// Add connectionStatus prop
    handleChainSelection?: (chainName: string, chainId: number, chainSym: string, chainTitle: string,chainWrappedTokenName: string, chainWrappedTokenSymbol: string,chainLabel: any, chainWrappedTokenAddress: string, chainImage: string) => void; // Add handleChainSelection prop
  };
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || "f0c8437284e8b30d3f6201d1be4d8730";
    const client = createThirdwebClient({ clientId: clientId });
    const wallets = [
      createWallet("io.metamask"),
      createWallet("com.coinbase.wallet"),
      walletConnect(),
      createWallet("com.trustwallet.app"),
      createWallet("me.rainbow"),
      createWallet("app.phantom"),
    ];
    const bsc = defineChain({id: 56,});
    const fantom = defineChain({ id:250,});

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, chainList, handleChainSelection, modalId }) => {
  const closeModal = () => {
    onClose();
  };

  return (
    <>
      {isOpen && modalId === 1 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
          <div className="bg-zinc-600 bg-opacity-40 p-8 rounded-lg max-w-md">
            <h2 className="text-2xl font-bold mb-4">Select a Chain</h2>
            {chainList && handleChainSelection && chainList.map((chain: any) => (
              <button key={chain.id} onClick={() => handleChainSelection(chain.name,chain.id,chain.symbol,chain.title,chain.wrappedTokenName,chain.wrappedTokenSymbol,chain.chainLabel,chain.wrappedTokenAddress,chain.image)} className="text-yellow-300 flex items-center py-2">
                <div className="mr-4">
                  <Image src={chain.image} alt={chain.title} width={40} height={40} />
                </div>
                <span>{chain.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && modalId === 2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
          <div className="bg-zinc-600 bg-opacity-40 p-8 rounded-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">Connect your wallet to continue</h2>
            <ConnectButton
            chains={[ethereum,polygon,bsc,optimism,arbitrum,base,avalanche,fantom]}
        client={client}
        wallets={wallets}
        theme={darkTheme({
          colors: {
            primaryText: "#F6E05E",
            accentText: "#a6942b",
            accentButtonBg: "#919397",
            primaryButtonText: "#F6E05E",
            primaryButtonBg: "#030303",
          },
        })}
        connectModal={{
          size: "wide",
          titleIcon: "/logo.png",
          showThirdwebBranding: false,
          welcomeScreen: {
            title:
              "Your Gateway to Seamless Wallet Management Across All Chains",
              img: {
                src: "/logo.png",
                width: 150,
                height: 150,
              },
          },
        }}
      />
      <button onClick={closeModal} className="text-yellow-300 py-2">Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
