export interface IAddress {
    id: string,
    specifically: string,
    lat: string,
    long: string,
    userId: string
}


export interface IUser {
    id: string,
    email: string,
    password: string,
    addressId: string,
    isEnable2FA: string,
    twoFaSecret: string,
    address: IAddress
}