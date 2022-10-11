

import { Features } from './../../inventario/interfaces/inventario.interface';
import { useState, useEffect } from 'react';
import { getAllStatus } from '../helpers/getAllStatus';
import { StatusProps } from '../interface/estado.interface';

export const useEstado = () => {
    

        const [status, setStatus] = useState<Features[]>([]);
        const [loading,setLoading] = useState<boolean>(true);
        const [actionAndStatusId, setActionAndStatusId] = useState<any>({
          action:'',
          id:''
        });
      
        useEffect(() => {
          getAllStatus()
          .then((data) => {
            setStatus(data)
            setLoading(false);
          })
          .catch(() => setLoading(true))
          console.log('effect')
        }, [])
        const [inputValues, setInputValues] = useState<StatusProps>({
    
          name:'',
          status:'',
      
        });
        const handleInput = (e:any) => {
             setInputValues({
              ...inputValues,
              [e.target.name]:e.target.value
             })
        }
        const selectStatus = (status:Features) => {
           setInputValues({
             name:status.name,
             status:status.status,
           })
           setActionAndStatusId({
             action:'update',
             id:status._id
           })
        }
        const handleCancel = () => {
          setInputValues({
             name:'',
             status:''
          })
          setActionAndStatusId({
            action:'',
            id:''
          })
        }
        return {
          status,
          actionAndStatusId,
          setActionAndStatusId,
          inputValues,
          handleInput,
          selectStatus,
          handleCancel,
          loading
        }
    
    
}
