const express = require('express')
const userSchema = require('../Models/userSchema')
const CheckAuth = require('../middleware/CheckAuth')

const userRoutes = express.Router()

// ************* USER PROFILE VIEW **************

userRoutes.get('/user-view-profile', async (req, res) => {

    try {

        const viewUserProfile = await userSchema.find()

        // console.log('viewUserProfile=====>', viewUserProfile);

        if (viewUserProfile) {
            return res.status(200).json({
                succes: true,
                error: false,
                data: viewUserProfile,
                message: 'User viewed sucessfully'
            })
        } else {
            return res.status(400).json({
                succes: false,
                error: true,
                message: 'User failed to view'
            })
        }

    } catch (error) {

        return res.status(500).json({
            succes: false,
            error: true,
            message: 'Internal server error'
        })

    }

})

// ********** SINGLE USER VIEW ************

userRoutes.get('/single-user-view', CheckAuth, async (req, res) => {

    try {

        const id = req.Data.loginId
        console.log('loginIdSinglrUser====>', id);


        const singleUserView = await userSchema.findOne({ user_loginId: id }).populate('user_loginId')
        console.log('singleUserView====>', singleUserView);


        if (singleUserView) {

            return res.status(200).json({
                succes: true,
                error: false,
                data: singleUserView,
                message: 'User viewed sucessfully'
            })

        }
        else {

            return res.status(400).json({
                succes: false,
                error: true,
                message: 'User failed to view'
            })

        }

    } catch (error) {

        return res.status(500).json({
            succes: false,
            error: true,
            message: 'Internal server error'
        })

    }

})

module.exports = userRoutes