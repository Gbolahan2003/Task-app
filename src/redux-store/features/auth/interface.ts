
export interface login{
    email:string,
    password:string
}

export interface user{
    firstName:string,
    lastName:string, 
    email:string,
    accessToken:string, 
    refreshToken:string
}

export interface register{
    firstName:string,
    lastName:string,
    email:string,
    passworrd:string
}