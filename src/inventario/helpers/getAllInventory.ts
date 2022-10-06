import axios from 'axios';
import { Inventario } from '../interfaces/inventario.interface';

export const getAllInventory = async():Promise<Inventario[]> => {
   const { data } = await axios.get<Inventario[]>('https://inventario-app-backend.herokuapp.com/api/inventario/get-all');
   return data;
}
