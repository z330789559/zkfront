import React, { ComponentProps, ElementType,useMemo,useEffect,useState } from 'react'
import PropTypes from 'prop-types';
import { useSubstrate } from "../context"
import { Row, Col ,Button} from 'antd';
import * as ethers from 'ethers';
import { wallet}  from 'zksync';
import * as zksync from 'zksync';
import  Wallet from 'ethers';
type DespositPros = ElementType<{
    setTransChange:React.Dispatch<number>
    transChange:number
}>

export default (props:ComponentProps<DespositPros>) =>{
const {syncWallet} =useSubstrate();
const [syncWallet2 ,setSyncWallet2]=useState({});
const {setTransChange,transChange} =props;
const initWallet= async (MNEMONIC2:string)=>{
    const syncProvider = await zksync.getDefaultProvider('rinkeby');
    const ethersProvider = await ethers.getDefaultProvider('rinkeby');    
    const ethWallet2 = await ethers.Wallet.fromMnemonic(MNEMONIC2).connect(ethersProvider);
    const syncWallet2 = await zksync.Wallet.fromEthSigner(ethWallet2, syncProvider);
    setSyncWallet2(syncWallet2);
}

const transfor= async (): Promise<void>=>{
    const amount = await zksync.utils.closestPackableTransactionAmount(ethers.utils.parseUnits('10',"mwei"));
    const transfer = await syncWallet?.syncTransfer({
    to: "0x8c9a6CE95C16ba0B90bDFaac0EA17Caaef27B456", //0x8c9a6CE95C16ba0B90bDFaac0EA17Caaef27B456
    token: 'USDT',
    amount,
    });
    const transferReceipt = await transfer?.awaitReceipt();
    setTransChange(transChange==0?1:0)
    console.log(transfer)

}

useEffect(()=>{
    initWallet("bird extra sauce dolphin cheese luxury already maple moon aisle sadness what shine glance merry");
},[])
  
return (
    <React.Fragment>
    <Row>
        <Button onClick={transfor}>交易</Button>
     </Row>
     </React.Fragment>
)
}