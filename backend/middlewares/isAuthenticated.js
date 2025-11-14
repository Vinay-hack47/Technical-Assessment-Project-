import jwt from "jsonwebtoken";

export const isAuthenticated = async(req, res, next) =>{
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({ message: "User is Unauthorized" });
    }

    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({ message: "Unauthorized" });
    };

    req.id = decode.userId;
    next();
    
  } catch (error) {
    return res.status(500).json({ message: "Error in authentication" });
  }
}