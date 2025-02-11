const User = require('../models/user.model.js')
const jwt = require('jsonwebtoken')
const getAccessToken = async (code) => {
    const body = new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        client_id: '86edtk8jzsgjnv',
        client_secret: 'WPL_AP1.eyo74omPsoBtw9fg.RS4gew==',
        redirect_uri: 'http://localhost:5000/api/linkedin/callback'

    })
    const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString()
    })

    if (!response.ok) {
        throw new Error(response.statusText)
    }
    const accessToken = await response.json()
    return accessToken


}

const linkedInCallback = async (req, res) => {
    try {
        const { code } = req.query
        // get AccessToken:
        const accessToken = await getAccessToken(code)
        // get user data using accessToken:
        const userData = await getUserData(accessToken.access_token)
        console.log(userData)


        if (!userData) {
            return res.status(500).json({
                success: false,
                error
            })
        }
        // check user is already exist :
        let user;
        user = await User.findOne({ email: userData.email })
        if (!user) {
            user = new User({
                name: userData.name,
                email: userData.email,
                phone: userData?.phone,
                avatar: userData?.picture
            })
            await user.save()
        }
        const token = jwt.sign({ name: user.name, email: user.email, avatar: user.avatar }, JWT_SECRET = 'fjnjherknfd5454554564dsfdfdvdf')

        res.cookie('token', token,
            {
                httpOnly: true
            }
        )
        res.redirect('http://localhost:5173/profile')

    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
}

const getUserData = async (accessToken) => {
    const response = await fetch('https://api.linkedin.com/v2/userinfo', {
        method: 'get',
        headers: {
            Authorization: `Bearer ${accessToken} `

        }
    })
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    const userData = await response.json()
    return userData
}
const getUser = async (req, res) => {
    const token = req.cookies?.token;
    if (!token) {
        res.status(403).json({
            success: false,
        })
    }
    const user = jwt.verify(token, JWT_SECRET = 'fjnjherknfd5454554564dsfdfdvdf')
    res.status(200).json({
        success: true,
        user
    })
}


module.exports = { linkedInCallback, getUser };
