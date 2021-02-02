import React, { ComponentProps, ElementType } from 'react'
import PropTypes from 'prop-types';
import { useSubstrate } from "../context"
import { Row, Col ,Button} from 'antd';
import * as ethers from 'ethers';
import { wallet} from 'zksync';

type DespositPros = ElementType<{
    setTransChange:React.Dispatch<number>
    transChange:number
}>
export default (props:ComponentProps<DespositPros>) =>{
const {syncWallet} =useSubstrate();
const {setTransChange,transChange} =props;
const addDespoit= async ()=>{
    const deposit  = await syncWallet?.depositToSyncFromEthereum({
        depositTo: syncWallet.address(),
        token: 'USDT',
        amount: 1000000000
      });
      console.log(deposit);
     // Await confirmation from the zkSync operator
// Completes when a promise is issued to process the tx
const depositReceipt = await deposit?.awaitReceipt();
console.log(depositReceipt);
setTransChange(transChange==0?1:0)
// Await verification
// Completes when the tx reaches finality on Ethereum
const FinldepositReceipt = await deposit?.awaitVerifyReceipt();

console.log(FinldepositReceipt);
}
const Withdrawing= async ()=>{
    console.log("取款")
    const withdraw = await syncWallet?.withdrawFromSyncToEthereum({
        ethAddress: syncWallet?.address(),
        token: 'USDT',
        amount: ethers.utils.parseUnits('0.998',"mwei")
      });
        await withdraw?.awaitReceipt();
        setTransChange(transChange==0?1:0)
      await withdraw?.awaitVerifyReceipt();

}
const approve=async()=>{
   await syncWallet?.approveERC20TokenDeposits("0x3b00ef435fa4fcff5c209a37d1f3dcff37c705ad")
}
return (
    <Row justify="center">
         <Col span={24}><Row> <h1>全部功能</h1></Row></Col>
        <Button onClick={addDespoit}>质押</Button>
        <Button onClick={Withdrawing}>取款</Button>
        <Button onClick={approve}>解锁</Button>
     </Row>
)
}