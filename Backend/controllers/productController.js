const express = require("express");
const Product = require("../models/productSchema.js");
const cloudinary = require("../config/cloudinary.js");

const getProducts = async (req, res) => { 
    try{
        const products = await Product.find({});
        res.json(products);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

const getProductById = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

const createProduct = async (req, res) => {
    try{
        const { name, description, category, stock, price } = req.body;
        let imageUrl = '';
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
            console.log(result)
        }
        const product = await Product.create({ name, description, category, stock, price, imageUrl });
        res.status(201).json(product);
    }
    catch(error){
        console.log("error in createProduct:", error);
        res.status(500).json({ message: error.message });
    }
}

const updateProduct = async (req, res) => {
    try{
        const { name, description, category, stock, price } = req.body;
        const product = await Product.findById(req.params.id);
        if(product){
          product.name = name || product.name;
          product.description = description || product.description;
          product.category = category || product.category;
          product.stock = stock || product.stock;
          product.price = price || product.price;
        }

        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path);
            product.imageUrl = result.secure_url;
            console.log(result)
        }
        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);  
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }
        await product.deleteOne();  // use product.deleteOne()
        res.json({ message: "Product deleted successfully" });
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
}
