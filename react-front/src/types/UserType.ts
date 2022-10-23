export type UserType = {
    userId: string,
    accountId: number | null,
    accountName: string,
    accountAddress: string,
    accountContact: string,
    accountMail: string,
    accountRemarks: string
}

export const UserTypeInit: UserType = {
    userId: '',
    accountId: null,
    accountName: '',
    accountAddress: '',
    accountContact: '',
    accountMail: '',
    accountRemarks: ''
}