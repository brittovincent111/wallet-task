const userSchemma = require("../../schema/userSchema")
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')

const controller = {

    userRegistration : async(req,res)=>{

        try {
            console.log(req.body, "body ")
            let {
                email,
                username,
                userId,
                password
            } = req.body

            password = await bcrypt.
                hash(req.body.password, 10)

            let emailCheck = await userSchemma.
                findOne( { $or :[{email: email  , userId : userId}] })
            if (emailCheck) {

                res.status(401).
                    json({ error: "Email or UserId ......Exists" })
            } else {

                await userSchemma.create({
                    userId : userId,
                    username : username,
                    email: email,
                    username: username,
                    password: password
                })

                res.status(200).
                    json({ success: "user created" })

            }

        } catch (error) {

            console.log(error)
            res.status(500).
                json({ error: "something went wrong" })

        }



    }, 
    userLogin: async (req, res) => {

        try {
            console.log(req.body, "req.body")
            const {
                email,
                password
            } = req.body

            let checkEmail = await userSchemma.
                findOne({ email: email })

            if (checkEmail) {

                const checkPassword = await bcrypt.
                    compare(password, checkEmail.password)

                if (checkPassword) {

                    const id = checkEmail._id
                    const UserToken = jwt.sign({ id },
                        process.env.JWT_KEY_USER, {
                        expiresIn: "365d",
                    })
       
            
                    res.status(200).
                        json({ UserToken: UserToken, user: checkEmail })
                } else {

                    res.status(401).
                        json({ error: "wrong password" })
                }

            } else {

                res.status(401).
                    json({ error: "Email id doesn't exist" })

            }

        } catch (error) {
            
            console.log(error , "error")
            res.status(500).
                json({ error: "something went wrong" })

        }
    },

    userDetails : async(req,res)=>{
        try{
           
            let users = await userSchemma.
              findOne({_id : req.params.id})

              const data = {
                password,
                 payment,
                ...details

              } = users._doc

              console.log(payment ,"datttaaa");

              res.status(200).json({details , payment   })


        }catch(error){

        }
    },

    findUser : async(req,res)=>{
        try {
            let users = await userSchemma.
              find({
                userId: {
                  $regex: '^' + req.params.val,
                  $options: "i"
                }
              },{password :0})
              console.log(users , "username")
            res.status(200).json(users)
      
          } catch (error) {
            
            console.log(error , "error")
            res.send(error)
      
          }
    },

    userPayment:async(req,res)=>{
        try{

            console.log(req.body)
            const {
                senderId,
                recieverId,
                userId,
                username,
                amount,
                message

            } = req.body

            let payment = await userSchemma.updateOne({ _id : recieverId },
                {$push : { 'payment' : { 

                    senderId : senderId ,
                    recieverId : recieverId,                   
                    amount : amount,
                    status : "credited",
                    message : message ,
                    date : Date.now()

                     
                }},$inc:{wallet : amount} }
                )
                let paymentDebited = await userSchemma.updateOne({ _id : senderId },
                    {$push : { 'payment' : { 
    
                        senderId : senderId ,
                        recieverId : recieverId,                   
                        amount : amount,
                        status : "debited",
                        message : message ,
                        date : Date.now()
    
                         
                    }},$inc:{wallet : -amount} }
                    )

        }catch(error){

            console.log(error , "error")

        }
    }
    
}

module.exports = controller