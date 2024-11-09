const express = require('express')
const loginSchema = require('../Models/loginSchema')
const userSchema = require('../Models/userSchema')
const agencysSchema = require('../Models/agencysSchema')

const jwt = require('jsonwebtoken')

require('dotenv').config()

const multer = require('multer')

const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')



cloudinary.config({

    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,

})

const CloudStorage = new CloudinaryStorage({

    cloudinary: cloudinary,
    params: {
        folder: 'Travel'
    }

})
const upload = multer({ storage: CloudStorage })

const authRoutes = express.Router()

// *********** REGISTRATION ***********

// *********** USER REGISTRATION *************

authRoutes.post('/user-register', upload.single('user_img'), async (req, res) => {
    try {
        console.log(req.file);

        const loginData = {
            email: req.body.email,
            password: req.body.password,
            role: 'User',
            status: '1'
        }
        console.log("loginData===>", loginData);

        const addData = await loginSchema(loginData).save()

        console.log('addData===>', addData);
        if (addData) {
            const data = {
                user_loginId: addData._id,
                name: req.body.name,
                phone: req.body.phone,
                address: req.body.address,
                age: req.body.age,
                user_img: req.file.path,
            }
            console.log('data===>', data);

            const regsiter = await userSchema(data).save()

            console.log("register==>", regsiter);

            if (regsiter) {

                return res.status(200).json({
                    succes: true,
                    error: false,
                    message: 'User Registration sucessfully'
                })
            } else {
                return res.status(400).json({
                    succes: false,
                    error: true,
                    message: 'User Registration failed'
                })
            }
        }

    } catch (error) {
        return res.status(500).json({
            succes: false,
            error: true,
            message: 'internal server error',
            errorMessage: error
        })
    }

})

// *********** AGENCY REGISTRATION ************

authRoutes.post('/agency-register', upload.single('agency_img'), async (req, res) => {

    try {
        console.log(req.file);

        const AgencyloginData = {
            email: req.body.email,
            password: req.body.password,
            role: 'Agency',
            status: 'Approvel'
        }
        // console.log("loginData===>", AgencyloginData);

        const addData = await loginSchema(AgencyloginData).save()

        console.log('addData===>', addData);
        if (addData) {
            const data = {
                agency_loginId: addData._id,
                name: req.body.name,
                phone: req.body.phone,
                address: req.body.address,
                agency_img: req.file.path,
            }
            console.log('data===>', data);

            const agencyRegsiter = await agencysSchema(data).save()

            // console.log("agencyRegsiter==>", agencyRegsiter);

            if (agencyRegsiter) {

                return res.status(200).json({
                    succes: true,
                    error: false,
                    message: 'Agency Registration sucessfully'
                })
            } else {
                return res.status(400).json({
                    succes: false,
                    error: true,
                    message: 'Agency Registration failed'

                })
            }
        }

    }
    catch (error) {
        return res.status(500).json({
            succes: false,
            error: true,
            message: 'internal server error',
            errorMessage: error
        })
    }
})

// *********** LOGIN CHECK ***********

authRoutes.post('/login-check', async (req, res) => {

    try {

        const oldData = await loginSchema.findOne({ email: req.body.email })
        // console.log('oldData===>', oldData);

        if (!oldData) {
            return res.status(400).json({
                succes: false,
                error: true,
                message: 'User not found'
            })
        }

        const Password = req.body.password
      
        if (!oldData == Password) {
            return res.status(400).json({
                succes: false,
                error: true,
                message: 'Password is not match'
            })
        }

        else {

            const token = jwt.sign(
                {
                    loginId: oldData._id,
                    email: oldData.email,
                    password: oldData.password,
                    role: oldData.role,
                    
                },
                'private_key',
                { expiresIn: '4h' }
            )
            // console.log('token===>',token );
            

            return res.status(200).json({
                succes: true,
                error: false,
                message: 'User login successfuly',
                data: oldData,
                token: token,
            })
        }


    } catch (error) {
        return res.status(500).json({
            succes: false,
            error: true,
            message: 'internal server error',
            errorMessage: error
        })
    }

})





module.exports = authRoutes