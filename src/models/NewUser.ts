interface NewUser {
    name: string,
    birth: Date | null,
    gender: string,
    phone: string,
    email: string,
    address: string,
    password: string,
    confirmPassword: string,
    capcha: string
}

export default NewUser;