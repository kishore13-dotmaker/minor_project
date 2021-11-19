const express = require('express')
const router = express.Router()
const authActions = require('../controllers/authController')



router.get('/', authActions.pingRoute)
router.get('/newStudent', authActions.newStudentGetRoute)

router.get('/loginStudent', authActions.loginStudentGetRoute)



router.post('/newStudent', authActions.newStudent)

router.post('/loginStudent', authActions.StudentLogin)


router.all('*', authActions.errorPageRoute)




module.exports = router
