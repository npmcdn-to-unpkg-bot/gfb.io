/**
 * base64 画像を受け取ってリサイズして返却
 */
export default class ResizeBase64Image {
  constructor(base64Image) {
    this.base64Image = base64Image;
  }

  bySize(width, height) {
    console.log(width, height);
    return new Promise((resolve) => {
      const image = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      image.onload = () => {
        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);
        resolve(canvas.toDataURL());
      };
      image.src = this.base64Image;
    });
  }
}
