import fs from 'fs/promises';
import sharp from 'sharp';

interface ResizeImagePrams {
  width: number;
  height: number;
  pathFullImage: string;
  pathThumbImage: string;
}

// resize an image of given path and saves it to the given thumb path
// also returns the buffer of resized image on success
const resizeImage = async ({ width, height, pathFullImage, pathThumbImage }: ResizeImagePrams): Promise<Buffer> => {
  const data: Buffer | null = await fs.readFile(pathFullImage).catch(() => null);

  if (!data) {
    return Promise.reject();
  }

  const imageBuffer: Buffer | null = await sharp(data)
    .resize(width, height)
    .toBuffer()
    .catch(() => null);

  if (!imageBuffer) {
    return Promise.reject();
  }

  return fs
    .writeFile(pathThumbImage, imageBuffer)
    .then(() => {
      return imageBuffer;
    })
    .catch(() => {
      return Promise.reject();
    });
};

export default { resizeImage };
