import userinstance from '../instances/userInstances'

export const registration = (signUp) =>  userinstance.post('/userRegistration' , signUp)
export const findSearch = (val) =>  userinstance.get(`/find-user/${val}` )
export const payment = (details) => userinstance.patch('/user-payment' , details)
export const userDetail=(userId) => userinstance.get(`/user-details/${userId}`)
export const deposit = (details) => userinstance.patch('/user-deposit' , details)
