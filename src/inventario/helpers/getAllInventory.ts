import axios from 'axios';
import { Inventario } from '../interfaces/inventario.interface';

export const getAllInventory = async():Promise<Inventario[]> => {
   const { data } = await axios.get<Inventario[]>('http://localhost:8083/api/inventario/get-all');
   return data
}
