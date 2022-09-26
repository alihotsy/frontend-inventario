import { Inventario } from './../interfaces/inventario.interface';
import axios from "axios";



export const getItem = async(id:string):Promise<Inventario> => {
   try {
      const { data } = await axios.get<Inventario>(`http://localhost:8083/api/inventario/get-item/${id}`)
      return data;
      
   } catch (error) {
      throw new Error("Not founds")
   }
}