import { useEffect, useState } from "react";
import { getAllInventory } from "../helpers/getAllInventory";
import { Inventario } from "../interfaces/inventario.interface";


export const useInventario = () => {
    const [inventario, setInventario] = useState<Inventario[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      getAllInventory()
       .then((allInventory:any) => {
        setError(false);
        setLoading(false)
        setInventario(allInventory.items);
       })
       .catch(() => {
        setLoading(false)
        setError(true)
       })
      //AÑADIR UN LOADING O SPINNER MIENTRAS SE CARGA LOS DATOS
    },[])

    return { inventario, error, loading }
}
