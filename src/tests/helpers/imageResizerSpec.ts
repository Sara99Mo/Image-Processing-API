import path from 'path';
import imageHelper from '../../helper/imageHelper';

const pathFullImage = path.resolve(__dirname, '../../../assets/full/fjord.jpg');
const pathThumbImage = path.resolve(__dirname, '../../../assets/thumb/fjord.jpg');

describe('The imageResizer function', (): void => {
  it('returns a buffer after sucessfully resizing an image', async () => {
    const imageBuffer: Buffer = await imageHelper.resizeImage({
      height: 200,
      width: 250,
      pathFullImage,
      pathThumbImage,
    });
    expect(imageBuffer).toBeInstanceOf(Buffer);
  });

  it('rejects promise if something went wrong', async (): Promise<void> => {
    await expectAsync(
      imageHelper.resizeImage({
        height: 200,
        width: 250,
        pathFullImage: '',
        pathThumbImage,
      }),
    ).toBeRejected();
  });
});
