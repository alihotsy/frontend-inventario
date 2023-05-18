import { getAllUsers } from './../helpers/getAllUsers';
import { UserInputProps } from './../interface/user.interface';
import { Features } from './../../inventario/interfaces/inventario.interface';
import { useState, useEffect } from 'react';


export const useUsuario = () => {
    const [users, setUsers] = useState<Features[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
    const [actionAndUserId, setActionAndUserId] = useState<any>({
      action:'',
      id:''
    });
  
    useEffect(() => {
      getAllUsers()
      .then((data:any) => {
      
          setUsers(data.usuarios)
          setLoading(false);
        }).catch((err) => { 
          console.log(err);
          setLoading(true)
         })
      console.log('effect')
    }, [])
    const [inputValues, setInputValues] = useState<UserInputProps>({
  
      name:'',
      email:'',
      status:'',
  
    });
    const handleInput = (e:any) => {
         setInputValues({
          ...inputValues,
          [e.target.name]:e.target.value
         })
    }
    const selectUser = (user:Features) => {
       setInputValues({
         name:user.name,
         email:user.email!,
         status:user.status,
       })
       setActionAndUserId({
         action:'update',
         id:user.uid
       })
    }
    const handleCancel = () => {
      setInputValues({
         name:'',
         email:'',
         status:''
      })
      setActionAndUserId({
        action:'',
        id:''
      })
    }
    return {
      users,
      actionAndUserId,
      setActionAndUserId,
      inputValues,
      handleInput,
      selectUser,
      handleCancel,
      loading
    }
}
