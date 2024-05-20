import axios from "axios"

const CreateUser = async (firstname:string,lastname:string,email:string) => {

    try{

        const users = await axios.post(`${process.env.NEXT_PUBLIC_api_url}/users/`,{firstname,lastname,email})
        if(!users) return null

        return users

    }catch(error:any) {
        return error
    }

}


export default CreateUser