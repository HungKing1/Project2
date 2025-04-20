import multer from "multer";

const storage = multer.diskStorage({})//không lưu vào máy 

const upload = multer({storage})

export default upload