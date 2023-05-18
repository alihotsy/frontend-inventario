import { Features } from './../interfaces/inventario.interface';
import axios from 'axios';


export const getAllModules = async():Promise<any> => {
    const marcas = await axios.get<any[]>('http://localhost:8083/api/marca/get-all');
   const estados = await axios.get<Features[]>('http://localhost:8083/api/estado-equipo/get-all');
   const tipos =  await axios.get<Features[]>('http://localhost:8083/api/tipo-equipo/get-all');
   const usuarios =  await axios.get<Features[]>('http://localhost:8083/api/usuario/get-all');
   return {
      brand: marcas.data.map((brand:any )=> ({uid:brand.uid,name:brand.name})),
      user: usuarios.data.map(user => ({uid:user.uid,name:user.name})),
      equipmentType: tipos.data.map(type => ({uid:type.uid,name:type.name})),
      equipmentStatus: estados.data.map(status => ({uid:status.uid,name:status.name}))
   }
}
