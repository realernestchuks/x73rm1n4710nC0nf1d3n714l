import Image from "next/image";
import React,{ useEffect } from "react";
import { Inter } from "next/font/google";
import Particles from "../components/particles";
import { Disclosure,} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import{ConnectButton,darkTheme,} from "thirdweb/react";
import {createWallet,walletConnect,} from "thirdweb/wallets";
import { createThirdwebClient } from 'thirdweb';
import {Card, CardHeader, CardBody, CardFooter, Divider,Link} from "@nextui-org/react";
import {NextPage} from "next";
import Marquee from "react-fast-marquee";
import Head from "next/head";



const inter = Inter({ subsets: ["latin"] });
const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Explore', href: 'explore', current: false },
  { name: 'Airdrops', href: '#', current: false },
  { name: 'Contact', href: 'https://discord.com/invite/V5JXzkjMPj', current: false },
];
const Home: NextPage = () => {

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-right');
        }
      });
    });

    const section = document.querySelector('.feature-section');
    if (section) {
      observer.observe(section);
    };
    

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);
  function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
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
function getCurrentYear(): number {
  return new Date().getFullYear();
}

const currentYear = getCurrentYear();
  return (
   <div className="flex flex-col  w-screen  overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
    <Head><title>ChainSpheres - Home</title></Head>
    <Particles
        className=" absolute -z-10 w-full h-full animate-fade-in"
        quantity={500}
      />
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
                  className="h-10 w-auto"
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
            <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-zinc-100 md:text-6xl md:tracking-tight animate-glow">
                <span>Welcome to</span> <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline">ChainSpheres</span> 
            </h1>
            <p className="px-0 mb-8 text-md text-gray-400 md:text-xl lg:px-24 animate-fade-up animate-once animate-ease-in-out animate-normal animate-fill-forwards">
            Discover the power of ChainSpheres, a cutting-edge dapp designed to simplify wallet management and streamline transactions across multiple blockchain networks. Experience the future of decentralized finance with ChainSpheres.
            </p>
        
  <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
  <Link href="/explore" className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-md text-white bg-emerald-400 bg-opacity-90 rounded-xl sm:w-auto sm:mb-0 hover:animate-jump">
                    Get Started
                    <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
</svg> </Link>&nbsp;&nbsp;
<Link href="/explore" className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-md text-black bg-gray-100 bg-opacity-90 rounded-xl sm:w-auto sm:mb-0 hover:animate-jump">
                    Learn More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                </Link>
            </div>
        </div>     
    </div> 
    <div className="mx-auto"> 
    <Card className="px-4 py-6 md:px-8 lg:px-12 xl:px-16 bg-gradient-to-tl from-zinc-800 bg-opacity-95 rounded-xl max-w-[400px] mx-auto md:max-w-[800px]">
  <CardBody>
    <p className="text-md md:text-base lg:text-lg text-purple-300 text-center">At ChainSpheres, we are committed to revolutionizing the way users interact with blockchain technology. Our platform offers a user-friendly solution for managing wallets across various chains in the web3 ecosystem, providing unparalleled convenience and security.<br></br>
    Explore the limitless possibilities of decentralized technology with ChainSpheres. Join us on a journey towards a connected and secure future powered by blockchain innovation. Discover the intersection of creativity, technology, and community as we shape the next generation of digital experiences together.<br/></p>
  </CardBody>
</Card>
</div>
<br></br>
<div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
<div className="feature-section">
<Particles
        className=" absolute -z-10 w-full h-full animate-fade-in"
        quantity={500}
      />
<div className="w-full md:w-4/5 lg:w-4/5 xl:w-4/5 mx-auto p-4 bg-zinc-900 bg-opacity-20 rounded-xl shadow-lg my-4 md:my-8">
  <h1 className="text-xl md:text-2xl font-bold text-emerald-600 text-center mb-4">Features</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
    <div className="feature-card p-4 bg-zinc-700 bg-opacity-30 rounded-xl hover:shadow-xl transition duration-300">
      <h2 className="text-lg font-semibold text-emerald-600 mb-2">Multi-Chain Wallet Support</h2>
      <p className="text-md text-emerald-200">Seamlessly manage wallets across different blockchain networks.</p>
    </div>
    <div className="feature-card p-4 bg-zinc-700 bg-opacity-30 rounded-xl hover:shadow-xl transition duration-300">
      <h2 className="text-lg font-semibold text-emerald-600 mb-2">Secure Transactions</h2>
      <p className="text-sm text-emerald-200">Safely send and receive assets with advanced encryption protocols.</p>
    </div>
    <div className="feature-card p-4 bg-zinc-700 bg-opacity-30 rounded-xl hover:shadow-xl transition duration-300">
      <h2 className="text-lg font-semibold text-emerald-600 mb-2">Interoperability</h2>
      <p className="text-sm text-emerald-200">Experience cross-chain compatibility for enhanced flexibility and accessibility.</p>
    </div>
    <div className="feature-card p-4 bg-zinc-700 bg-opacity-30 rounded-xl hover:shadow-xl transition duration-300">
      <h2 className="text-lg font-semibold text-emerald-600 mb-2">Decentralized Governance</h2>
      <p className="text-sm text-emerald-200">Participate in decentralized governance processes to shape the future of the platform.</p>
    </div>
  </div>
</div>
</div>
<div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
<div className="how-section">
<Particles
        className=" absolute -z-10 w-full h-full animate-fade-in"
        quantity={500}
      />
<div className="w-full md:w-4/5 lg:w-4/5 xl:w-4/5 mx-auto p-4 bg-zinc-900 bg-opacity-40 rounded-xl shadow-lg my-4 md:my-8">
<h1 className="text-xl md:text-2xl font-bold text-yellow-600 text-center mb-4">How it works</h1>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
<div className="feature-card p-4 bg-zinc-700 bg-opacity-30 rounded-xl hover:shadow-xl transition duration-300">
      <h2 className="text-lg font-semibold text-yellow-600 mb-2">Connect Your Wallet</h2>
      <p className="text-md text-yellow-200"> Link your existing wallets to ChainSpheres for unified management.</p>
    </div>
    <div className="feature-card p-4 bg-zinc-700 bg-opacity-30 rounded-xl hover:shadow-xl transition duration-300">
      <h2 className="text-lg font-semibold text-yellow-600 mb-2">Explore Features</h2>
      <p className="text-sm text-yellow-200">Discover the tools and functionalities available for seamless transactions.</p>
    </div>
</div>
</div>
</div>
<div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" /><br/>
<h1 className="text-xl md:text-2xl font-bold text-white text-center mb-4">Supported networks</h1><br/>
<Marquee direction="right" speed={90}>
<Particles
        className=" absolute -z-10 top-0 w-full h-full animate-fade-in"
        quantity={500}
      />
<div className="flex space-x-6 items-center">
  <Image src ="/images/ethereum.png" className=" h-20 w-auto" alt="Ethereum"  width={118} height={118}/>&nbsp;&nbsp;
  <Image src ="/images/arbitrum.png" className=" h-20 w-auto" alt="Arbitrum"  width={118} height={118}/>&nbsp;&nbsp;
  <Image src ="/images/polygon.png" className=" h-20 w-auto" alt="Polygon"  width={118} height={118}/>&nbsp;&nbsp;
  <Image src ="/images/optimism.png" className=" h-20 w-auto" alt="Optimism"  width={118} height={118}/>&nbsp;
  <Image src ="/images/binance.png" className=" h-20 w-auto" alt="Binance"  width={118} height={118}/>&nbsp;&nbsp;
  <Image src ="/images/avalanche.png" className=" h-20 w-auto" alt="Avalanche"  width={118} height={118}/>&nbsp;&nbsp;
  <Image src ="/images/fantom.png" className=" h-20 w-auto" alt="Fantom"  width={118} height={118}/>&nbsp;&nbsp;
  <Image src ="/images/base.webp" className=" h-20 w-auto" alt="Base"  width={118} height={118}/>&nbsp;&nbsp;
  </div>
  </Marquee>
  <br/>
  <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
  <br></br>
  <div className="security-section">
  <Particles
        className=" absolute -z-10 w-full h-full animate-fade-in"
        quantity={500}
      />
  <h1 className="text-xl md:text-2xl font-bold text-purple-400 text-center mb-4">Security and Privacy</h1><br/>
  <Card className="px-4 py-6 md:px-8 lg:px-12 xl:px-16 bg-gradient-to-tl from-zinc-800 bg-opacity-95 rounded-xl max-w-[400px] mx-auto md:max-w-[800px]">
  <CardBody>
    <p className="text-md md:text-base lg:text-lg text-purple-300 text-center">At ChainSpheres, we prioritize the security and privacy of your assets. <br/>Our platform implements robust security measures, encryption protocols, and privacy features to safeguard your funds and data.</p>
  </CardBody>
</Card>
<div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
</div>
  <br></br>
  <div className ="community-section flex flex-col items-center justify-center">
  <Particles
        className=" absolute -z-10 w-full h-full animate-fade-in"
        quantity={500}
      />
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
export default Home;
