import axios from "axios"

const GetUserById = async(id:string) => {

    try{

        const users = await axios.get(`${process.env.NEXT_PUBLIC_api_url}/users/${id}`)
        if(!users) return null

        return users

    }catch(error:any) {
        return error
    }

}


export default GetUserById