import axios from "axios";
import { Features } from "../../inventario/interfaces/inventario.interface";


export const getBrands = async():Promise<Features[]> => {
   const { data } = await axios.get<Features[]>('https://inventario-app-backend.herokuapp.com/api/marca/get-all');
   return data;
}