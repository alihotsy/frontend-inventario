
import { Features } from './../../inventario/interfaces/inventario.interface';
import { useState, useEffect } from 'react';
import { getBrands } from '../helpers/getBrands';
import { BrandProps } from '../interfaces/brand.interface';

export const useBrand = () => {
    const [brands, setBrands] = useState<Features[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
    const [actionAndBrandId, setActionAndBrandId] = useState<any>({
      action:'',
      id:''
    });
  
    useEffect(() => {
      getBrands()
      .then((data) => {
        setBrands(data)
        setLoading(false);
      }).catch(() => setLoading(false));
      console.log('effect')
    }, [])
    const [inputValues, setInputValues] = useState<BrandProps>({

      name:'',
      status:'',
  
    });
    const handleInput = (e:any) => {
         setInputValues({
          ...inputValues,
          [e.target.name]:e.target.value
         })
    }
    const selectBrand = (brand:Features) => {
       setInputValues({
         name:brand.name,
         status:brand.status,
       })
       setActionAndBrandId({
         action:'update',
         id:brand._id
       })
    }
    const handleCancel = () => {
      setInputValues({
         name:'',
         status:''
      })
      setActionAndBrandId({
        action:'',
        id:''
      })
    }
    return {
      brands,
      actionAndBrandId,
      setActionAndBrandId,
      inputValues,
      handleInput,
      selectBrand,
      handleCancel,
      loading
    }
}
