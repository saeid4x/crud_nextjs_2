import { UsersType } from "./users.type"

export type UsersData = {
     page:number,
     per_page:number,
     total:number,
     total_pages:number,
     data:[UsersType]

}