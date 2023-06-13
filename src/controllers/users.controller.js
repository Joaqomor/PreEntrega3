import userDTO from "../dto/user.dto.js";


export const logoutController = (req, res) => { 
    try {
        req.session.destroy( error => {
            if (error) {
                console.log(error);
                res.json({ message: error })
            } else {
                res.redirect('/views/login')
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const githubLoginPassportController = (req, res) => {
    try {
        req.session.email = req.user.email;
        res.redirect('/views/products');
    } catch (error) {
        console.log(error);
    }
}

export const currentUser = (req,res) => {
    res.send(new userDTO(req.user.payload))
}