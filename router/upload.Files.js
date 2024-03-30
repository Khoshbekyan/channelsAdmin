import { Router } from 'express';
import { uploadFile } from '../controllers/upload.Files.controler.js'
import { checkAuth } from '../middlewares/validation.js'
import multer from "multer"
import fs from "fs"

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('req: ', req.user.id);

    fs.mkdirSync(`./uploads/${req.user.id}/images`, {
        recursive: true
    });
    fs.mkdirSync(`./uploads/${req.user.id}/others`, {
        recursive: true
    });
    const ext = file.mimetype.split("/")[0];
    if (ext === "image") {
      cb(null, `uploads/${req.user.id}/images`);
    } else {
      cb(null, `uploads/${req.user.id}/others`);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.originalname}`);
  },
});


const upload = multer({
    storage: multerStorage,
    dest: 'uploads/',
    limits : {fileSize : 1000000000}
 })

const usersRouter = Router();

usersRouter.post("", checkAuth, upload.single('picture'), uploadFile)

export default usersRouter;