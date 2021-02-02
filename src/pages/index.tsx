import React,{useState} from 'react';
import './index.css';
import {SubstrateContextProvider,useSubstrate} from './context/index'
import Desposit from './depositing'
import{ Row,Col}  from 'antd'
import Balance from './balances'
import Transfor from './transfor'
import Fee from './fee'
import "antd/dist/antd.css"
import { Content } from 'antd/lib/layout/layout';
export default function() {

const [transChange,setTransChange] =useState(0);

  return (
    <SubstrateContextProvider>
    <Content className={"main_content"}>
        <Row ><Desposit  transChange={transChange} setTransChange={(val:number)=>setTransChange(val)}/></Row>
        <Row><Transfor  transChange={transChange} setTransChange={(val:number)=>setTransChange(val)}/></Row>
        <Row >
          <Col span={12}><Balance transChange={transChange}/></Col>
        </Row>
          <Fee />

        </Content>
    </SubstrateContextProvider>
  );
}

