"use client"

import GetUserById from "@/actions/GetUserById"
import { UsersInitialData } from "@/constants/UsersInitialData"
import { UsersType } from "@/types/users.type"
import { useEffect, useState } from "react"
import {Card, CardHeader, CardBody, Image, Chip} from "@nextui-org/react";
import { BiSolidUserDetail } from "react-icons/bi"
import {Skeleton} from "@nextui-org/skeleton";


type Params = {
    userId:string
}
const UserPage = ({params}:{params:Params}) => {

    const [user , setUser] = useState<UsersType>(UsersInitialData)
    const [isLoaded , setIsLoaded] = useState(false)
    const {userId} = params;
    useEffect(() => {
        if(userId){
            GetUserById(userId)
                .then((response:any) => {
                    if(response.data){
                        if(response.status === 200){
                            console.log({user:response.data})
                            setUser(response.data.data)
                        }
                    }
                })

        }
    } , [userId])

      
    useEffect(() => {
        if(user && user.id > 0){
            setIsLoaded(true)
        } else{
            setIsLoaded(false)
        }
    } , [user])


    return (
        <>
          <Card   className="py-4 mx-auto w-[30%]    mt-6">
                <CardHeader className="pb-0 pt-2 px-4 flex-col  gap-3 items-start">
                    <Chip
                            startContent={<BiSolidUserDetail size={18}/>}
                            variant="faded"
                            color="success"
                        >
                            Details
                    </Chip>
                    <Skeleton className="rounded-lg" isLoaded={isLoaded}>
                        <small className="text-default-500">{user.email}</small>
                    </Skeleton>

                    <Skeleton className="rounded-lg" isLoaded={isLoaded}>
                        <h4 className="font-bold text-large">{user.first_name} {user.last_name}</h4>
                    </Skeleton>
                </CardHeader>
                <CardBody  className="overflow-visible py-2">

                <Skeleton className="rounded-lg" isLoaded={isLoaded}>
                    <Image
                     
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={user.avatar}
                    width={390}
                    />
                </Skeleton>
                </CardBody>
            </Card>  
        </>
    )
}


export default UserPage


