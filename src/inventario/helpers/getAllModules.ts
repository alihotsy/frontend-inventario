import { Features } from './../interfaces/inventario.interface';
import axios from 'axios';


export const getAllModules = async():Promise<any> => {
    const marcas = await axios.get<Features[]>('http://localhost:8083/api/marca/get-all');
   const estados = await axios.get<Features[]>('http://localhost:8083/api/estado-equipo/get-all');
   const tipos =  await axios.get<Features[]>('http://localhost:8083/api/tipo-equipo/get-all');
   const usuarios =  await axios.get<Features[]>('http://localhost:8083/api/usuario/get-all');
   return {
      brand: marcas.data.map(brand => ({_id:brand._id,name:brand.name})),
      user: usuarios.data.map(user => ({_id:user._id,name:user.name})),
      equipmentType: tipos.data.map(type => ({_id:type._id,name:type.name})),
      equipmentStatus: estados.data.map(status => ({_id:status._id,name:status.name}))
   }
}
