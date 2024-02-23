import {OutUserData} from '../utilities/types'
export const jsonStringifier = (type: string , outData: OutUserData) =>{
  return JSON.stringify({
    type,
    data: JSON.stringify(outData),
    id: 0,
  });
}