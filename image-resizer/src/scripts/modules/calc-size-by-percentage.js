/**
 * 元サイズと変更率(%) を受け取って縦横比と保った計算結果を返す
 *
 * @param {number} originWidth
 * @param {number} originHeight
 * @param {number} scaleRatio

 * @return {Object} resized values.
 * @property {number} width - resized width.
 * @property {number} height - resized height.
 */
const calcSizeByPercentage = (originWidth, originHeight, scaleRatio) => {
  const resizedSize = { width: 0, height: 0 };
  if (!originWidth || !originHeight) { return resizedSize; }
  if (!scaleRatio) { return resizedSize; }

  resizedSize.width = originWidth * (scaleRatio / 100);
  resizedSize.height = originHeight * (scaleRatio / 100);

  Object.keys(resizedSize).forEach((key) => {
    resizedSize[key] = Math.round(resizedSize[key]);
  });

  return resizedSize;
};

export default calcSizeByPercentage;
