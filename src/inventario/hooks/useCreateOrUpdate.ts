import { getAllModules } from './../helpers/getAllModules';
import { getItem } from './../helpers/getItem';
import { ItemProps } from './../interfaces/item.interface';
import { useState, useEffect } from 'react';


export const useCreateOrUpdate = (id:string) => {
    const [updateSection, setUpdateSection] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [modules, setModules] = useState<any>({
        brand:[],
        user:[],
        equipmentStatus:[],
        equipmentType:[]
    });
    const [inputValues, setInputValues] = useState<ItemProps>({
        serial:'',
        model:'',
        description:'',
        image:'',
        purchaseDate:'',
        price:0,
        user:'',
        brand:'',
        equipmentStatus:'',
        equipmentType:''

    });
    useEffect(() => {
            getAllModules()
            .then(modules => {
                setModules(modules)
                setLoading(false)
            })
            if(id){
                getItem(id)
                .then((data) => {
                    setError(false);
                    setUpdateSection(true);
                    setInputValues({
                        serial:data.serial,
                        model:data.model,
                        description:data.description,
                        image:data.image,
                        purchaseDate: data.purchaseDate.toString().substring(0,10),
                        price:data.price,
                        user:data.user?._id,
                        brand:data.brand._id,
                        equipmentStatus:data.equipmentStatus._id,
                        equipmentType:data.equipmentType._id
                    })
                    
                }).catch(() => setError(true))

            }else{
                setUpdateSection(false);
                setLoading(false);
                setError(false)
                setInputValues({
                    serial:"",
                    model:"",
                    description:"",
                    image:"",
                    purchaseDate:"",
                    price:0,
                    user:"",
                    brand:"",
                    equipmentStatus:"",
                    equipmentType:""
                })
            }
        
        
    }, [id])
    const onInput = (e:any) => {
          setInputValues({
             ...inputValues,
             [e.target.name]:e.target.value
          });
    }
    return {
        updateSection,
        error,
        inputValues,
        onInput,
        modules,
        loading
    }
}
