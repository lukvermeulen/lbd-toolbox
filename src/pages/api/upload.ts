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
    let subPath: string;

    switch (fields.filetype) {
      case "pointcloud":
        subPath = "pointclouds";
        break;
      case "picture":
        subPath = "pictures";
        break;
      default:
        return res.status(500).json({ error: `Error handling file` });
    }

    const fileUrl = await saveFile(files.file, subPath);

    return res.status(201).json({ fileUrl: fileUrl });
  });
};

const saveFile = async (
  file: FormidableFile | FormidableFile[],
  subPath: string
) => {
  if (Array.isArray(file)) return false;
  const data = fs.readFileSync(file.filepath);
  const filePath = `./public/uploads/${subPath}/${file.originalFilename}`;
  const fileUrl = `http://localhost:3000/uploads/${subPath}/${file.originalFilename}`;
  fs.writeFileSync(filePath, data);
  return fileUrl;
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    post(req, res);
  } else {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  }
};
