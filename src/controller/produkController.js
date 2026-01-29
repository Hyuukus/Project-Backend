const db=require('../config/db')


const getData=async(req,res)=>{
    try{
        const query='SELECT * FROM tb_produk'
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
        const query='SELECT * FROM tb_produk WHERE id = ?'
        const [rows]=await db.query(query, id)
        res.status(200).json({
            message:'berhasil get data',
            data:rows
        })
    }catch(err){
        throw err
    } 
}

const createData=async(req,res)=>{
    try{
        const data={
            nama_produk:req.body.nama_produk,
            harga:req.body.harga,
            stok:req.body.stok,
            kategori:req.body.kategori
        }
        const query='INSERT INTO tb_produk (nama_produk,harga,stok,kategori) VALUES(?,?,?,?)'
        const [rows]=await db.query(query,[data.nama_produk,data.harga,data.stok,data.kategori])
        res.status(201).json({
            message:'berhasil simpan data di database',
            data:rows
        })
    }catch(error){
        throw error
    } 
}

const updateData=async(req,res)=>{
     try{
        const{id}=req.params
        const data={
            nama_produk:req.body.nama_produk,
            harga:req.body.harga,
            stok:req.body.stok,
            kategori:req.body.kategori
        }
        const query='UPDATE tb_produk SET nama_produk=?, harga=?, stok=?, kategori=? WHERE id=?'
        const [rows]=await db.query(query,[data.nama_produk,data.harga,data.stok,data.kategori,id])
        res.status(201).json({
            message:'berhasil mengupdate data',
            data:rows
        })
     }catch(error){
        throw error
    } 
}

const deleteData=async(req,res)=>{
    try{
        const {id}=req.params
        const query='DELETE FROM tb_produk WHERE id=?'
        await db.execute(query,[id])
        res.status(200).json({
            message:'berhasil hapus data'
        })
    }catch(error){
        throw error
    }

}
module.exports={
    getData,
    createData,
    updateData,
    deleteData,
    getById
}