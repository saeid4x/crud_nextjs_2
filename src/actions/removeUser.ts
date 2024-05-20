import axios from "axios"

const RemoveUser = async (userId:string) => {

    try{

        const users = await axios.delete(`${process.env.NEXT_PUBLIC_api_url}/users/${userId}`)
        if(!users) return null

        return users

    }catch(error:any) {
        return error
    }

}


export default RemoveUser