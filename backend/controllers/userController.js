const register = async (req,res)=>{
    try {
        console.log(req.body)
        res.json('ok');
    } catch (error) {
        
    }
}

module.exports = {
    register
}