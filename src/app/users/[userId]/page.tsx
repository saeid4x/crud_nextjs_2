"use client"

import GetUserById from "@/actions/GetUserById"
import { UsersInitialData } from "@/constants/UsersInitialData"
import { UsersType } from "@/types/users.type"
import { useEffect, useState } from "react"
import {Card, CardHeader, CardBody, Image, Chip} from "@nextui-org/react";
import { BiSolidUserDetail } from "react-icons/bi"


type Params = {
    userId:string
}
const UserPage = ({params}:{params:Params}) => {

    const [user , setUser] = useState<UsersType>(UsersInitialData)
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
                    <small className="text-default-500">{user.email}</small>
                    <h4 className="font-bold text-large">{user.first_name} {user.last_name}</h4>
                </CardHeader>
                <CardBody  className="overflow-visible py-2">
                    <Image
                     
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={user.avatar}
                    width={390}
                    />
                </CardBody>
            </Card>  
        </>
    )
}


export default UserPage


