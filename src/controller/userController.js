const db=require('../config/db')
const bcrypt=require('bcrypt')

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
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getById
}