import axios from "axios";
import { Features } from "../../inventario/interfaces/inventario.interface";


export const getAllEquipmentTypes = async():Promise<Features[]> => {
   const { data } = await axios.get<Features[]>('http://localhost:8083/api/tipo-equipo/get-all');
   return data;
}