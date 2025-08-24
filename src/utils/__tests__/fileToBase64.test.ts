import fileToBase64 from '../fileToBase64';

describe('fileToBase64 util', () => {
  it('should convert file to base64 string', async () => {
    const blob = new Blob(['hello'], { type: 'text/plain' });
    const file = new File([blob], 'hello.txt');

    const result = await fileToBase64(file);
    expect(result).toContain('base64');
  });
});
