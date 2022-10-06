import axios from "axios";
import { Features } from "../../inventario/interfaces/inventario.interface";


export const getAllEquipmentTypes = async():Promise<Features[]> => {
   const { data } = await axios.get<Features[]>('https://inventario-app-backend.herokuapp.com/api/tipo-equipo/get-all');
   return data;
}