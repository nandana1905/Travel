const express = require('express')
const agencysSchema = require('../Models/agencysSchema')
const CheckAuth = require('../middleware/CheckAuth')


const agencyRoutes = express.Router()

// *********** AGENCY PROFILE VIEW *************

agencyRoutes.get('/agency-view-profile', async (req, res) => {

    try {
        
        const viewAgencyProfile = await agencysSchema.find()

        console.log('viewAgencyProfile=====>',viewAgencyProfile);

        if (viewAgencyProfile) {
            return res.status(200).json({
                succes: true,
                error: false,
                data: viewAgencyProfile,
                message: 'Agency viewed sucessfully'
            })
        } else {
            return res.status(400).json({
                succes: false,
                error: true,
                message: 'Agency failed to view'
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

// *********** SINGLE AGENCY VIEW ************

agencyRoutes.get('/single-agency-view', CheckAuth, async (req, res) => {

    try {

        const id = req.Data.loginId
        // console.log('loginIdSinglrUser====>', id);


        const singleAgencyView = await agencysSchema.findOne({ agency_loginId: id }).populate('agency_loginId')
        // console.log('singleAgencyView====>', singleAgencyView);


        if (singleAgencyView) {

            return res.status(200).json({
                succes: true,
                error: false,
                data: singleAgencyView,
                message: 'Agency viewed sucessfully'
            })

        }
        else {

            return res.status(400).json({
                succes: false,
                error: true,
                message: 'Agency failed to view'
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

// ***************** AGENCY ADD DESTINATION ***************

module.exports = agencyRoutes