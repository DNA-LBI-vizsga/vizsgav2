const { User } = require("../models/UserModel")
const bcrypt = require("bcrypt")


async function getUser(){
    try {
        const user = await User.findOne()
        return user
    } catch (error) {
        return null
    }
}

async function createUser(name, password, isAdmin){
    
    
    const userPassword = password || 'leltarjelszo';
    try{
        const numSalts = 10
        const hashedPassword = await bcrypt.hash(userPassword, numSalts) 
        const user = await User.create(
            { userName: name, userPassword: hashedPassword, isAdmin: isAdmin }

        )
        
        return {message: `User ${user.userName} created successfully` }
    }
    catch(err){
        throw new Error('Failed to create user'); 
    }
}


async function updateUser(userName, newPassword) {
    console.log(newPassword, userName)
    //findOne({ where: {id: id}})
    try{
        const user = await User.findOne({where:{name: userName}})
        console.log(user)

        if (!user) {
            throw new Error(`User ${user.userName} not found`);
        }

        const numSalts = 10
        const hashedPassword = await bcrypt.hash(newPassword, numSalts) 

        console.log(hashedPassword, newPassword)

        user.set({
            userName: user.userName,
            userPassword: hashedPassword,
            isAdmin: user.isAdmin
        })  

        await user.save()

        return {message: "Password changed"}
    }catch(err){
        throw new Error('Error changing password'); 
    }
}


module.exports = {
    getUser,
    createUser,
    updateUser
}