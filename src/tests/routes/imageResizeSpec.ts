import request from 'supertest'; 
import path from 'path';
import sizeOf from 'image-size';
import app from '../../index'; 

describe('GET /api/images', () => {
    it('responds with 400 if called without parameters', (done): void => {
        request(app).get('/api/images').expect(400, done);
    });

    it('created a thumb version of the image with the correct height and width', (done): void => {
        request(app)
            .get('/api/images?filename=fjord&height=200&width=250')
            .then(() => {
                const dimensions = sizeOf(path.resolve(__dirname, '../../../assets/thumb/fjord-250x200.jpg'));
                expect(dimensions.height).toEqual(200);
                expect(dimensions.width).toEqual(250);
                done();
            });
    });
});
