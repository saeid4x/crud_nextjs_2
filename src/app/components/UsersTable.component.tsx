"use client"

import React, { useEffect, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue,useDisclosure, Pagination, Skeleton} from "@nextui-org/react";
import { UsersData } from "@/types/usersData.type";
import { UsersType } from "@/types/users.type";
import { columns } from "@/constants/columnsUsersTable";
import { FaRegEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";
import { UsersInitialData } from "@/constants/UsersInitialData";
import EditUserModal from "./UserEditModal";
// import {EditIcon} from "./EditIcon";
// import {DeleteIcon} from "./DeleteIcon";
// import {EyeIcon} from "./EyeIcon";
// import {columns, users} from "./data";

const statusColorMap: Record<string, ChipProps["color"]>  = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

// type User = typeof users[0];


 

type UsersTableParams = {
    usersData:UsersData,
    handleEditUser:(userId:string)=>void,
    removeUser:(userId:string) =>void ,
    handleGetUser:(currentPage:number) =>void,
    isReload:boolean
    
} 

const UsersTable:React.FC<UsersTableParams> = ({usersData,handleEditUser,removeUser,handleGetUser,isReload}) => {
  

  // const {isOpen, onOpen, onOpenChange} = useDisclosure();
      
 const [currentPage , setCurrentPage] = useState(1)
 const [isLoaded , setIsLoaded] = useState(false)

useEffect(() =>{
  console.log({target:'useEffect' ,usersData })
  // setUsersData(usersData.data)
} ,[ ])
  
useEffect(() => {
  handleGetUser(currentPage)
} , [currentPage])

useEffect(() =>{
  setCurrentPage(1)
} , [isReload])


  const renderCell = React.useCallback((user: UsersType, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof UsersType];

    if(user.id > 0){
      setIsLoaded(true)
    } else{
      setIsLoaded(false)
    }


   
    const nameColumn = (
      <div className="flex flex-col gap-2 ">
        <Link href={`${process.env.NEXT_PUBLIC_app_url}/users/${user.id}`} >
            <p className="font-medium text-base text-black">{user.first_name} {user.last_name}</p>
        </Link>
         <p>{user.email}</p>
      </div>
    )

   
  
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{radius: "lg", src: user.avatar}}
            description={nameColumn}
            name={cellValue}
          >
            
            {user.email}
          </User>
        );
      // case "role":
      //   return (
      //     <div className="flex flex-col">
      //       <p className="text-bold text-sm capitalize">{cellValue}</p>
      //       <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
      //     </div>
      //   );
      // case "status":
      //   return (
      //     <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
      //       {cellValue}
      //     </Chip>
      //   );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <Link href={`users/${user.id}`}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <FaRegEye />
                </span>
              </Link>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={()=>handleEditUser(user.id.toString())}>
              <CiEdit   />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => removeUser(user.id.toString())}>
              <RiDeleteBin6Line />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);




  return (
    <>
      <Table aria-label="Example table with custom cells" className="w-[50%] mx-auto" fullWidth={false}  >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={usersData.data}>
                 
            {(item) => (
              <TableRow key={item.id}>
                    {(columnKey) =>       
                           <TableCell>{renderCell(item, columnKey)}</TableCell>   }
                     
              </TableRow>
            )}
            
          </TableBody>
        </Table>

        <Pagination total={2}  page={currentPage} color="danger" size="lg" className="w-[50%] mx-auto mt-5 mb-20  "
        onChange={setCurrentPage}
        />

      
        
    
    </>
  );
}


export default UsersTable