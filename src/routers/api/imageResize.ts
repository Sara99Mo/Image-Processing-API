import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import imageHelper from '../../helper/imageHelper';
import { Stats } from 'fs';

const imageResize = express.Router();

imageResize.get('/', async (req: Request, res: Response): Promise<void> => {
  const filename = req.query['filename'];
  const height = req.query['height'] ? parseInt(req.query['height'] as string, 10) : null;
  const width = req.query['width'] ? parseInt(req.query['width'] as string, 10) : null;

  // check if the query is correct
  if (!filename || !height || !width) {
    res.status(400).send('Please make sure url contains correct filename, height and width params');
    return;
  }

  //get the full path from the filename
  const pathFullImage = path.resolve(__dirname, `../../../assets/full/${filename}.jpg`);

  //thumb path in the ${filename}-${width}x${height} format to save different size of images
  const pathThumbImage = path.resolve(__dirname, `../../../assets/thumb/${filename}-${width}x${height}.jpg`);

  //if the filename is exist
  const fullImage: Stats | null = await fs.stat(pathFullImage).catch(() => {
    res.status(404).send("Image doesn't exist");
    return null;
  });

  if (!fullImage) {
    return;
  }

  // Check if thumb was already created
  const existThumb: Stats | null = await fs.stat(pathThumbImage).catch(() => {
    return null;
  });

  if (existThumb) {
    fs.readFile(pathThumbImage)
      .then((thumbData: Buffer) => {
        res.status(200).contentType('jpg').send(thumbData);
      })
      .catch(() => {
        res.status(500).send('Error occured processing the image');
      });
  } else {
    // resize image
    imageHelper
      .resizeImage({
        pathFullImage,
        pathThumbImage,
        height,
        width,
      })
      .then((resizedImage: Buffer) => {
        res.status(200).contentType('jpg').send(resizedImage);
      })
      .catch(() => {
        res.status(500).send('Error occured processing the image');
      });
  }
});

export default imageResize;
