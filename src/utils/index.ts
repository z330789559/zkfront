import { BigNumber, utils } from 'ethers';

;
const formatAmout=(amount:string,unit:string):string=>{
  if(undefined ==amount)
{
  return '0'
}
   const balance= BigNumber.from(amount);
   
     return   utils.formatUnits(balance,unit)
}

interface Action<T> {
  payload?: T
  type: string
}
interface Module{
  count: number;
  message: string;
  asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>;
  syncMethod<T, U>(action: Action<T>): Action<U>;
}
type FunName<T>= {
   [p in keyof T]: T[p] extends Function ?p:never
}[keyof T]

 type Connect<T> =    (module: T) =>{  [p in FunName<T> ] :  T[p]  }
  type Show= Connect<Module>
 type ReturnOf<T> =T extends ( args:any)=> infer F ?F:never;
 type HSow=ReturnOf<Show>
 type Changeparams<T>= T extends  <V, U>(action:Promise< infer V>)=>Promise<infer U>? <V, U>(action: Action<V>)=>Action<U>: T ;

type Transresult<T> = { [p in keyof ReturnOf<Connect<T>> ]:Changeparams<ReturnOf<Connect<T>>[p]>}      

type ResultType= Transresult<Module>


export {formatAmout}