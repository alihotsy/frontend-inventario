import axios from "axios";
import { Features } from "../../inventario/interfaces/inventario.interface";


export const getAllUsers = async():Promise<Features[]> => {
   const { data } = await axios.get<Features[]>('http://localhost:8083/api/usuario/get-all');
   return data;
}