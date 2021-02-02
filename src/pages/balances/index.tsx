import React, { ComponentProps, ElementType,useState,useEffect } from 'react'
import PropTypes from 'prop-types';
import { useSubstrate } from "../context"
import { Row, Col ,Button} from 'antd';
import * as ethers from 'ethers';
import { wallet} from 'zksync';
import {formatAmout} from '@utils'

type DespositPros = ElementType<{transChange:number}>
interface UsdtPriceInterfer{
    usdtbalance:string,
    usdtverifiedBalance:string,
    usdtcommittedETHBalance:string,
    usdtcommittedVerifyETHBalance:string
}

export default (props:ComponentProps<DespositPros>) =>{
    const {transChange} =props;
const {syncWallet} =useSubstrate();

const [balance,setBalance] =useState('0')
const [verifiedBalance,setVerifiedBalance] =useState('0');
const [committedETHBalance,setCommittedETHBalance] =useState('0')
const [committedVerifyETHBalance,setCommittedVerifyETHBalance] =useState('0')

const [usdtPrice,setUsdtPrice] =useState<Partial<{[p in keyof UsdtPriceInterfer]: UsdtPriceInterfer[p]|0 }>>({});
const getAccountBalance= async ()=>{
    // Committed state is not final yet
    const _committedETHBalance = await syncWallet?.getBalance('ETH');
    const _committedUSDTBalance = await syncWallet?.getBalance('USDT');
    setBalance(formatAmout(_committedETHBalance?.toString()||'0',"ether"));
    // Verified state is final
    const _verifiedETHBalance = await syncWallet?.getBalance('ETH', 'verified');
    const _verifiedUSDTBalance = await syncWallet?.getBalance('USDT', 'verified');
    setVerifiedBalance(formatAmout(_verifiedETHBalance?.toString()||'0',"ether"))

    setUsdtPrice((state)=>{
        return {usdtbalance: formatAmout(_committedUSDTBalance,"mwei"),
        usdtverifiedBalance:formatAmout(_verifiedUSDTBalance,"mwei"),
        usdtcommittedETHBalance:state.usdtcommittedETHBalance,
        usdtcommittedVerifyETHBalance:state.usdtcommittedVerifyETHBalance
        }
    })
}
useEffect(()=>{
    
    getAccountBalance();
    getTokenListasync();
},[syncWallet,transChange]);

const getTokenListasync= async ()=>{
    const state = await syncWallet?.getAccountState();

    const committedBalances = state?.committed.balances||{};
    const committedETHBalance = committedBalances['ETH'];
    console.log(committedETHBalance);
    
    setCommittedETHBalance(formatAmout(committedETHBalance?.toString()||'0',"ether"));
    const verifiedBalances = state?.verified.balances||{};
    const committedVerifyETHBalance = verifiedBalances['ETH'];
    console.log(committedVerifyETHBalance);
    setCommittedVerifyETHBalance(formatAmout(committedVerifyETHBalance?.toString()||'0',"ether"));

    setUsdtPrice((state)=>{
        return {usdtbalance: state.usdtbalance,
        usdtverifiedBalance: state.usdtverifiedBalance,
        usdtcommittedETHBalance:formatAmout(committedBalances["USDT"],"mwei"),
        usdtcommittedVerifyETHBalance:formatAmout(verifiedBalances["USDT"],"mwei")
        }
    })

}
return (
    <React.Fragment>
        <Row>ETH账户余额</Row>
        <Row><span>balance:</span>{balance}</Row>
        <Row><span>verifiedETHBalance：</span>{verifiedBalance}</Row>
        <Row><span>committedETHBalance:</span>{committedETHBalance}</Row>
        <Row><span>committedVerifyETHBalance:</span>{committedVerifyETHBalance}</Row>
        <Row>USDT账户余额</Row>
        <Row><span>balance:</span>{usdtPrice.usdtbalance}</Row>
        <Row><span>verifiedETHBalance：</span>{usdtPrice.usdtverifiedBalance}</Row>
        <Row><span>committedETHBalance:</span>{usdtPrice.usdtcommittedETHBalance}</Row>
        <Row><span>committedVerifyETHBalance:</span>{usdtPrice.usdtcommittedVerifyETHBalance}</Row>
     </React.Fragment>
)
}