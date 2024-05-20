import axios from "axios"

const GetUsers = async(page:number = 1) => {

    try{

        const users = await axios.get(`${process.env.NEXT_PUBLIC_api_url}/users?page=${page}`)
        if(!users) return null

        return users

    }catch(error:any) {
        return error
    }

}


export default GetUsers