"use client"

import GetUsers from "@/actions/GetUsers"
import { UsersInitialData } from "@/constants/UsersInitialData"
import { UsersType } from "@/types/users.type"
import { useEffect, useState } from "react"
import UsersTable from "../components/UsersTable.component"
import { UsersData } from "@/types/usersData.type"
import { UsersDataInitialData } from "@/constants/usersData_initial"
import { Button, useDisclosure} from "@nextui-org/react";
import EditUserModal from "../components/UserEditModal"
import GetUserById from "@/actions/GetUserById"
import UpdateUserById from "@/actions/UpdateUserById"
import RemoveUser from "@/actions/removeUser"
import { IoMdPersonAdd } from "react-icons/io"
import CreateUserModal from "../components/userCreateModal"
import CreateUser from "@/actions/CreateUser"
import { TfiReload } from "react-icons/tfi"
import {toast as toastify} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UsersPage = () => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen:createModal_isOpen, onOpen:createModal_onOpen, onOpenChange:createModal_onOpenChange} = useDisclosure();
    const [isReload , setIsReload] = useState(false)
    const [tableKey , setTableKey] = useState(0)
      
    const [usersData , setUsersData] = useState<UsersData>(UsersDataInitialData)
    const [userData, setUserData] = useState<UsersType[]>()
    const [selectedUser , setSelectedUser] = useState<UsersType>(UsersInitialData)

    useEffect(() => {
        handleGetUser()
    } , [])
    

    const handleGetUser = (currentPage:number = 1) => {
        const toastLoading = toastify.loading(' Fetching all users.....')
        GetUsers(currentPage)
        .then((response:any) => {
            if(response.data){
                if(response.status === 200){
                    // console.log( {target:'users-page',users:response.data})
                    // console.log( {target:'users-page2',users:response.data.data})
                    setUsersData(response.data)
                    toastify.dismiss(toastLoading);
                    toastify.success(`All usres Fetched successfully ✔`)

                 

                    
                }

                
            }
        }) 
    }
    const handleEditModal = (userId:string) => {  

          
         GetUserById(userId)
            .then((response:any) => {
                if(response.data){
                    if(response.status === 200){
                        // console.log( {target:'handleEditUser',})
                        setSelectedUser(response.data.data)
                        onOpen()
                    }
                }
            })
      
    }

     const sendUserForEdit = (userId:string,firstname:string,lastname:string,email:string) => {
        // console.log({userId,firstname,lastname,email})
        const toastLoading = toastify.loading('updating user info.....')
        UpdateUserById(userId)

            .then((response:any) =>{
                if(response.data){
                    if(response.status === 200){
                        console.log({updatedUser:response.data}) 
                        toastify.dismiss(toastLoading);
                        toastify.success(`user updated successfully 😎`)

                        //  updatedAt:"2024-05-20T17:44:21.699Z"

                    }
                }
            }).catch((error:any) =>{
                toastify.dismiss(toastLoading);
                toastify.error('Something went wrong')
            })
        
     }

     const removeUser = (userId:string) => {
         
         const toastLoading = toastify.loading('Removing user.....')
         try{
            RemoveUser(userId)
                .then((response:any) => {
                    if(response.data){
                        if(response.status === 204){
                           toastify.dismiss(toastLoading);
                           toastify.success('user remove successfully 😍')
                        }
                    }
                }).catch((error:any) =>{
                    toastify.dismiss(toastLoading);
                    toastify.error(`Something went wrong ${error}`)
                })

        } catch(error:any){
            toastify.dismiss(toastLoading);
            toastify.error(`Something went wrong ${error}`)
        }
     }

     const createUser = (firstname:string , lastname:string, email:string) => {

        const toastLoading = toastify.loading('Creating new user  .....')

        try{
            CreateUser(firstname,lastname,email)
                .then((response:any) => {
                    if(response.data){
                        console.log({userCreated:response.data});
                        if(response.status === 201) {
                            toastify.dismiss(toastLoading);
                           toastify.success('new user create successfully 😍')
                            createModal_onOpenChange()
    
                        }
    
                    }
                }).catch((error:any) =>{
                    toastify.dismiss(toastLoading);
                    toastify.error('Something went wrong')
                })

        } catch(error:any){
            toastify.dismiss(toastLoading);
            toastify.error(`Something went wrong ${error}`)
        }

     }

    
    
    return (
        <>
        <h1>users page</h1>

        <div className="flex flex-row gap-4 mx-auto w-[50%] mb-3">
            <Button color="secondary" variant="bordered" startContent={<IoMdPersonAdd />}
                onClick={()=>createModal_onOpen()}
            >
                Create user
            </Button>


            <Button color="warning" variant="bordered" startContent={<TfiReload />}
                onClick={() => {
                    handleGetUser();
                    setIsReload(true);
                    setTableKey((prevState) =>prevState+10)
                  }}
            >
                Reload
            </Button>
        </div>
        <UsersTable usersData={usersData} handleEditUser={handleEditModal} removeUser={removeUser} handleGetUser={handleGetUser} isReload={isReload} key={tableKey}/>
        <EditUserModal isOpen={isOpen} onOpen={onOpen}  onOpenChange={onOpenChange} user={selectedUser} sendUserForEdit={sendUserForEdit} />

        <CreateUserModal isOpen={createModal_isOpen} onOpen={createModal_onOpen}  onOpenChange={createModal_onOpenChange} user={selectedUser} createUser={createUser} />


        </>
    )
}


export default UsersPage


