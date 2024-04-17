import React from 'react';

const NextChainModal = ({ chainName, chainId, chainSym, chainTitle, chainWrappedTokenName,chainWrappedTokenSymbol,chainLabel, chainWrappedTokenAddress, onClickSync }: { chainName: string, chainId: number, chainSym: string, chainTitle: string, chainWrappedTokenName: string, chainWrappedTokenSymbol: string, chainLabel: any, chainWrappedTokenAddress: string, chainImage: string, onClickSync: () => void }) => {
    return (
      
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur" id="modal-root">
            <div className="bg-zinc-600 bg-opacity-40 p-8 rounded-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">Click button to continue synchronization</h2>
          <button onClick={onClickSync} className="bg-zinc-900 text-white px-4 py-2 mt-4 rounded-md">Sync Chain</button>
        </div>
      </div>
    );
  };
  export default NextChainModal;