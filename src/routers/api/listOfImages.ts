import express, { Response, Request } from 'express';
import fs from 'fs/promises';
import path from 'path';

const listImagesRouter = express.Router();

listImagesRouter.get('/', async (_req: Request, res: Response): Promise<void> => {
  const folderPathFullImage = `${path.resolve(__dirname, '../../../assets/full')}`;

  const files: string[] | null = await fs.readdir(folderPathFullImage).catch(() => {
    res.status(500).send('Error occured reading the images');
    return null;
  });

  if (!files) {
    return;
  }

  let htmlResponse = `
    <select name="filename" style="margin: 10px 2px; padding: 8px; width: 55%;">
    <option>Select Image Name</option>
    `;

  files.forEach((file: string): void => {
    file = file.replace('.jpg', '');
    htmlResponse = htmlResponse + `<option>${file}</option>`;
  });

  const htmlForm = `
        <h1 style="text-align:center; color:#258;">Image Processing API</h1>
        <h3 style="text-align:center;">Please Enter filename, height and width and make sure url contains correct params</h3>
        <form method="GET" action="api/images" 
        style="    
            border: 5px dotted #f56;
            padding: 40px;
            margin: 50px auto;
            width: 500px;
            text-align: center;
            background: #1166118a;
            border-radius: 20%;
            box-shadow: 8px 7px 16px 3px;
            font-size: x-large;">
            Filename: <br>${htmlResponse}</select><br>
            Width: <br><input type="number" name="width" style="margin: 10px 2px; padding: 8px; width: 55%;"><br>
            Height: <br><input type="number" name="height" style="margin: 10px 2px; padding: 8px; width: 55%;"><br>
            <button type="submit" 
            style="
                margin: 10px 2px 0;
                color: #012;
                background: #f56;
                padding: 10px 20px;
                border: none;
                border-radius: 20%;
                font-weight: 600;
                font-size: smaller;"
            >Submit</button>
        </form>
    `;
  res.status(200).send(`${htmlForm}`);
});

export default listImagesRouter;
