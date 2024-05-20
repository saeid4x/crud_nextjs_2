import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { FaUserTie } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { UsersType } from "@/types/users.type";
 


type  EditUserModalProps = {
    isOpen:boolean,
    onOpen:() => void,
    onClose?: () => void,
    onOpenChange:() => void,
    user:UsersType,
    sendUserForEdit:(userId:string,firstname:string, lastname:string,email:string) => void
    


}
const EditUserModal:React.FC<EditUserModalProps> = ({isOpen,onOpen,onClose,onOpenChange,user,sendUserForEdit}) => {
//   const {isOpen, onOpen, onOpenChange} = useDisclosure();
const [firstName , setFirstName] = useState('')
const [lastName , setLastName] = useState('')
const [email , setEmail] = useState('')
const [data , setData] = useState({  
  first_name:'',
  last_name:'',
  email:''
})

useEffect(() => {
  console.log({target:'edit-modal',user})
} , [])
    


 
  return (
    <>
      {/* <Button onPress={onOpen} color="primary">Open Modal</Button> */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Update User Information</ModalHeader>
              <ModalBody>
                
                <Input
                  autoFocus
                  endContent={
                    <FaUserTie  className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Firstname"
                  placeholder="Enter your first name"
                  variant="bordered"
                  name="first_name"
                 
                  defaultValue={user && user.first_name}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setFirstName(e.target.value)}
                />
                <Input
                  endContent={
                    <FaUserTie className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Lastname"
                  placeholder="Enter your lastname"
                  type="text"
                  variant="bordered"
                  defaultValue={user && user.last_name}
                  name="last_name"
                  onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setLastName(e.target.value)}
                />
                <Input
                  endContent={
                    <MdEmail  className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your Email"
                  type="email"
                  variant="bordered"
                  defaultValue={user && user.email}
                  name="email"
                  onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)}
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => sendUserForEdit(user && user.id.toString(),firstName,lastName,email)}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
export default EditUserModal