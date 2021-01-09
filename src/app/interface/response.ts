export interface userlogin {
    value:boolean;
    message:string;
    token:string;
    user:user;
}

export interface user{
    id: any,
    email: string,
    password:string,
    names: string,
    surnames: string,
    createdAt:any;
    updatedAt:any;
}


export interface File{
    user_id: string;
    id_bucket: string;
    name: string;
    url: string;
    type:string;
    ext: string;
    size: string;
    createdAt:any;
    updatedAt:any;
}
