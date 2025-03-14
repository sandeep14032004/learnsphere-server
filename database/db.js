import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log(`Database connected URI : ${process.env.DB}`);
  } catch (error) {
    console.log(error);
  }
};
