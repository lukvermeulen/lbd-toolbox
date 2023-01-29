import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import type { File as FormidableFile } from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    const fileName = await saveFile(files.file);

    console.log(fields);
    return res
      .status(201)
      .json({ fileUrl: `http://localhost:3000/uploads/${fileName}` });
  });
};

const saveFile = async (file: FormidableFile | FormidableFile[]) => {
  if (Array.isArray(file)) return false;
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`./public/uploads/${file.originalFilename}`, data);
  return file.originalFilename;
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    post(req, res);
  } else {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  }
};
