import {OutUserData, RoomData} from '../utilities/types'
export const jsonStringifier = (type: string , outData: OutUserData | RoomData) =>{
  return JSON.stringify({
    type,
    data: JSON.stringify(outData),
    id: 0,
  });
}