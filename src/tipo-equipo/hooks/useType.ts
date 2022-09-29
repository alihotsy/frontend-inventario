import { Features } from './../../inventario/interfaces/inventario.interface';
import { useState, useEffect } from 'react';
import { getAllEquipmentTypes } from '../helpers/getAllEquipmentTypes';
import { TypeProps } from '../interface/tipos.interface';


export const useType = () => {
  
    const [types, setTypes] = useState<Features[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [actionAndTypeId, setActionAndTypeId] = useState<any>({
      action:'',
      id:''
    });
  
    useEffect(() => {
      getAllEquipmentTypes()
      .then((data) => {
        setTypes(data);
        setLoading(false);
      }).catch(() => setLoading(true))
      console.log('effect')
    }, [])
    const [inputValues, setInputValues] = useState<TypeProps>({

      name:'',
      status:'',
  
    });
    const handleInput = (e:any) => {
         setInputValues({
          ...inputValues,
          [e.target.name]:e.target.value
         })
    }
    const selectStatus = (type:Features) => {
       setInputValues({
         name:type.name,
         status:type.status,
       })
       setActionAndTypeId({
         action:'update',
         id:type._id
       })
    }
    const handleCancel = () => {
      setInputValues({
         name:'',
         status:''
      })
      setActionAndTypeId({
        action:'',
        id:''
      })
    }
    return {
      types,
      actionAndTypeId,
      setActionAndTypeId,
      inputValues,
      handleInput,
      selectStatus,
      handleCancel,
      loading
    }
}
