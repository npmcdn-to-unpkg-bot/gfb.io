/**
 * 元サイズと変更サイズを受け取って縦横比を保った計算結果を返す
 *
 * @param {number} originWidth
 * @param {number} originHeight
 * @param {number} targetHeight
 * @param {number} targetWidth
 *
 * @return {Object} resized values.
 * @property {number} width - resized width.
 * @property {number} height - resized height.
 */
const calcSizeByPixel = (originWidth, originHeight, targetWidth = false, targetHeight = false) => {
  let resizedSize = { width: 0, height: 0 };

  if (!originWidth || !originHeight) { return resizedSize; }

  // 両方入力されている場合は、入力値をそのまま返す
  if (targetWidth && targetHeight) {
    resizedSize.width = targetWidth;
    resizedSize.height = targetHeight;

    // 幅基準の計算
  } else if (targetWidth) {
    resizedSize.width = targetWidth;
    resizedSize.height = originHeight * (targetWidth / originWidth);

    // 横基準の計算
  } else if (targetHeight) {
    resizedSize.height = targetHeight;
    resizedSize.width = originWidth * (targetHeight / originHeight);
  }

  Object.keys(resizedSize).forEach((key) => {
    resizedSize[key] = Math.round(resizedSize[key]);
  });

  return resizedSize;
};

export default calcSizeByPixel;
