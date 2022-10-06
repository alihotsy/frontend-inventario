import axios from "axios";
import { Features } from "../../inventario/interfaces/inventario.interface";


export const getAllUsers = async():Promise<Features[]> => {
   const { data } = await axios.get<Features[]>('https://inventario-app-backend.herokuapp.com/api/usuario/get-all');
   return data;
}