import dotenv from "dotenv";
import Product from "../models/Product";
import productsValidator from "../validations/products";

dotenv.config();

const { DB_URL } = process.env;

export const getAll = async (req, res) => {
  try {
    const data = await Product.find({});

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Khong tim thay san pham" });
    }
    return res
      .status(200)
      .json({ message: "Tim thay san pham sau", products: data });
  } catch (error) {
    return res.status(500).json({
      message: "Loi server",
    });
  }
};

export const getDetail = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Khong tim thay san pham" });
    }
    return res
      .status(200)
      .json({ message: "Tim thay san pham sau", products: data });
  } catch (error) {
    return res.status(500).json({
      message: "Loi server",
    });
  }
};

export const getDetailLessThan = async (req, res) => {
  try {
    const data = await Product.find({ instock: { $lte: 100 } });
    console.log(data);

    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ message: "Khong tim thay san pham co so luong tuong ung" });
    }
    return res
      .status(200)
      .json({ message: "Tim thay san pham sau", products: data });
  } catch (error) {
    return res.status(500).json({
      message: "Loi server",
    });
  }
};

export const createProduct = async (req, res) => {
  const { error } = productsValidator.validate(req.body);
  console.log(error);

  if (error) {
    return res.status(500).json({
      message: error.details[0].message || "Ten san pham khong duoc de trong",
    });
  }
  try {
    console.log(req.body);
    //
    const data = await Product.create(req.body);
    if (!data) {
      return res.status(404).json({ message: "Tao san pham khong thanh cong" });
    }
    return res
      .status(200)
      .json({ message: "Tao san pham thanh cong", products: data });
  } catch (error) {
    return res.status(500).json({
      message: "Loi server",
    });
  }
};

export const editProduct = async (req, res) => {
  const { error } = productsValidator.validate(req.body);
  console.log(error);
  if (error) {
    return res.status(500).json({
      message: error.details[0].message || "Ten san pham khong duoc de trong",
    });
  }
  try {
    const data = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!data) {
      return res.status(404).json({ message: "Chinh sua khong thanh cong" });
    }
    return res
      .status(200)
      .json({ message: "Chinh sua thanh cong", products: data });
  } catch (error) {
    return res.status(500).json({
      message: "Loi server",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Xoa san pham khong thanh cong" });
    }
    return res.status(200).json({ message: "Xoa thanh cong" });
  } catch (error) {
    return res.status(500).json({
      message: "Loi server",
    });
  }
};
