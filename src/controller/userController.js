const db=require('../config/db')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const getUser=async(req,res)=>{
    try{
        const query='SELECT * FROM tb_user'
        const [rows]=await db.query(query)
        res.status(200).json({
            message:'berhasil get data',
            data:rows
        })
    }catch(err){
        throw err
    } 
}

const getById=async(req,res)=>{
    try{
        const {id} = req.params;
        const query='SELECT * FROM tb_user WHERE id = ?'
        const [rows]=await db.query(query, id)
        res.status(200).json({
            message:'berhasil get data',
            data:rows
        })
    }catch(err){
        throw err
    } 
}

const login = async (req, res, next) => {
    try {
        const {nama, password, email, role} = req.body;
        if (!nama || !password || !email || !role) {
            return res.status(400).json({
                message: 'username, password, email dan role wajib diisi'
            })
        }

        const query = 'SELECT * FROM tb_user WHERE nama = ?';
        const [rows] = await db.query(query, [nama]);

        if (rows.length === 0) {
            return res.status(401).json({
                message : 'username atau password salah'
            });
        }

        const user = rows[0]

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(401).json({
                message:'username atau password salah'
            });
        }

        const token = jwt.sign(
            { id: user.id, username : user.nama },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'login berhasil',
            token: token
        });

    } catch (error) {
        next(error);
    }
}

const createUser=async(req,res)=>{
     try{
        const data={
            nama:req.body.nama,
            email:req.body.email,
            password:req.body.password,
            role:req.body.role
           }
        if(!data.nama || !data.email || !data.password || !data.role){
            return res.status(400).json({
                message:'nama, email, password, dan role wajib diisi'
            })
        }
        const hashedPassword= await bcrypt.hash(data.password,10);
        const query='INSERT INTO tb_user (nama,email,password,role) VALUES(?,?,?,?)'
        const [rows]=await db.query(query,[data.nama,data.email,hashedPassword,data.role])
        res.status(201).json({
            message:'berhasil simpan data di database',
            data:rows
        })
    }catch(error){
        throw error
    } 
}

const updateUser=async(req,res)=>{
     try{
        const{id}=req.params
        const data={
            nama:req.body.nama,
            email:req.body.email,
            password:req.body.password,
            role:req.body.role
        }
        const query='UPDATE tb_user SET nama=?, email=?, password=?, role=? WHERE id=?'
        const [rows]=await db.query(query,[data.nama,data.email,data.password,data.role,id])
        res.status(201).json({
            message:'berhasil mengupdate data',
            data:rows
        })
     }catch(error){
        throw error
    } 
}

const deleteUser=async(req,res)=>{
    try{
        const {id}=req.params
        const query='DELETE FROM tb_user WHERE id=?'
        await db.execute(query,[id])
        res.status(200).json({
            message:'berhasil hapus data'
        })
    }catch(error){
        throw error
    }

}
module.exports={
    login,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getById
}