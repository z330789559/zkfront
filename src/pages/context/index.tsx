import React, { useReducer, useContext,Dispatch, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as zksync from 'zksync';
import { Wallet ,Provider} from 'zksync';
import * as ethers from 'ethers';
// import Web3 from 'Web3';
const MNEMONIC='cannon olive spread output bring burden slim spirit figure relax dinosaur glue hair dawn live'
interface InitState{
    syncWallet?: Wallet|undefined,
    mnemonic?: String,
    apiState: String,
    syncWSProvider?:Provider
}
const defaultValue:InitState={
    mnemonic: MNEMONIC,
    apiState:'',
    syncWallet:undefined,
    syncWSProvider:undefined
}
type ConnectAction = {   
    type: 'CONNECT_INIT'|'CONNECT'|'CONNECT_SUCCESS'|'CONNECT_ERROR';
    payload?:InitState
}

   
///
// Reducer function for `useReducer`

const reducer = (state:InitState, action:ConnectAction) => {
    switch (action.type) {
      case 'CONNECT_INIT':
        
        return { ...state, apiState: 'CONNECT_INIT' };
      
      case 'CONNECT':
        
        return { ...state, ...action.payload, apiState: 'CONNECTING' };
  
      case 'CONNECT_SUCCESS':
        
        return { ...state, apiState: 'READY' };
  
      case 'CONNECT_ERROR':
        return { ...state, apiState: 'ERROR', apiError: action.payload };
  
      default:
        throw new Error(`Unknown type: ${action.type}`);
    }
  };
  
const conect = async function  (state:InitState,dispatch:Dispatch<ConnectAction>) {

    await web3.currentProvider.enable();

    debugger
const ethersProvider = new ethers.providers.Web3Provider(
  web3.currentProvider
)

const syncWSProvider= await Provider.newHttpProvider('https://rinkeby-api.zksync.io/jsrpc')
const syncHttpProvider = await zksync.getDefaultProvider('rinkeby');

const singer=ethersProvider.getSigner();
const syncWallet = await zksync.Wallet.fromEthSigner(singer, syncWSProvider);
console.log(syncWallet)

const contractAddresses = await syncHttpProvider.getTokens();
console.log("支持的合约地址",contractAddresses)
// if (!(await syncWallet.isSigningKeySet())) {
//   if ((await syncWallet.getAccountId()) == undefined) {
//     throw new Error('Unknown account');
//   }

  // As any other kind of transaction, `ChangePubKey` transaction requires fee.
  // User doesn't have (but can) to specify the fee amount. If omitted, library will query zkSync node for
  // the lowest possible amount.
  // const changePubkey = await syncWallet.setSigningKey({ feeToken: 'ETH' });

  // // Wait until the tx is committed
  // await changePubkey.awaitReceipt();
  // console.log("changePubkey")


dispatch({
  type: 'CONNECT',
  payload:{
    apiState: "READY",
    syncWallet:syncWallet,
    syncWSProvider:syncWSProvider
  }
})

}
const SubstrateContext = React.createContext<InitState>(defaultValue);


const SubstrateContextProvider :React.FC= (props:React.ComponentProps<any>) => {
    // filtering props and merge with default param value
    const initState = { ...defaultValue };
 
    const [state, dispatch] = useReducer<(inistate:InitState,action:ConnectAction)=>any>(reducer, initState);
    
    useEffect(()=>{conect(state, dispatch)},[])
    // loadAccounts(state, dispatch);
  
    return <SubstrateContext.Provider value={state}>
      {props.children}
    </SubstrateContext.Provider>;
  };

const useSubstrate = () => ({ ...useContext(SubstrateContext) });
export {SubstrateContextProvider,useSubstrate};