import React, { ComponentProps, ElementType,useMemo,useEffect,useState } from 'react'
import PropTypes from 'prop-types';
import { useSubstrate } from "../context"
import { Row, Col ,Button} from 'antd';
import * as ethers from 'ethers';
import { wallet}  from 'zksync';
import * as zksync from 'zksync';
import  Wallet from 'ethers';
import {formatAmout} from '@utils'
type DespositPros = ElementType<{
    setTransChange:React.Dispatch<number>
    transChange:number
}>
interface Fee{
    batchFee?:string|'0',
    singleFee?:string|'0',

}
interface Price{
    dai?:number|0,
    eth?:number|0,
}
export default (props:ComponentProps<DespositPros>) =>{
const {syncWallet,syncWSProvider} =useSubstrate();
const [fee ,setfee]=useState<Fee>({
    batchFee:'0',
    singleFee:'0'
});
const [price,setPrice] =useState<Price>({
    dai:0,
    eth:0
})

const getTranforFee= async (): Promise<void>=>{
   const transferFee= await syncWSProvider?.getTransactionFee('Transfer',syncWallet?.address()||"","ETH");
   const batchTransferFee= await syncWSProvider?.getTransactionsBatchFee(['Transfer'],[syncWallet?.address()||""],"ETH");
   setfee({
    batchFee: formatAmout(transferFee?.totalFee||'0',"ether"),
    singleFee: formatAmout(batchTransferFee||'0',"ether")
   })
}

const getPrice =async (): Promise<void>=>{

    const ethPrice = await syncWSProvider?.getTokenPrice('ETH');
    const daiPrice = await syncWSProvider?.getTokenPrice('DAI');
    setPrice({
        eth: ethPrice,
        dai: daiPrice
       })

}
useEffect(()=>{
    getTranforFee();
    getPrice();
},[syncWallet])
  
return (
    <React.Fragment>
    <Row>
        <span>批量交易费:{fee.batchFee}</span>
     </Row>
     <Row>
        <span>单独交易费:{fee.singleFee}</span>
     </Row>
     <Row>
        <span>ETH price:{price.eth}</span>
     </Row>
     <Row>
        <span>DAI price:{price.dai}</span>
     </Row>
     </React.Fragment>
)
}