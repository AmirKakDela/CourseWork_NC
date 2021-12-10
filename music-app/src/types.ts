export type CurrentUserType = {
    userId: string,
    userName: string,
}

export type ErrorType = {
    response: {
        data: {
            message: string
        }
    }
}