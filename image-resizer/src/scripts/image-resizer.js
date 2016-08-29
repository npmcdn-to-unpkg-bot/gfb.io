import '../templates/index';

// Load CSS
import '../styles/layouts/default';
import '../styles/themes/default';
import '../styles/pages/image-resizer';

import calcSizeByPixel from './modules/calc-size-by-pixel';
import calcSizeByPercentage from './modules/calc-size-by-percentage';
import ResizeBase64Image from './modules/resize-base64-image';

const widthValueNode = document.querySelector('.width-value');
const heightValueNode = document.querySelector('.height-value');
const targetWidthValueNode = document.querySelector('.target-width-value');
const targetHeightValueNode = document.querySelector('.target-height-value');
const targetPercentageValueNode = document.querySelector('.target-percentage-value');
const resultWidthValueNode = document.querySelector('.result-width-value');
const resultHeightValueNode = document.querySelector('.result-height-value');




/**
 * 入力の状態を見て計算を行う
 *
 * @return {Object} resized values.
 * @property {number} width - resized width.
 * @property {number} height - resized height.
 */
const calc = () => {
  const width = parseInt(widthValueNode.value, 10);
  const height = parseInt(heightValueNode.value, 10);
  const targetWidth = parseInt(targetWidthValueNode.value, 10);
  const targetHeight = parseInt(targetHeightValueNode.value, 10);
  const targetPercentage = parseInt(targetPercentageValueNode.value, 10);

  if (!width) { return { width: 0, height: 0 }; }
  if (!height) { return { width: 0, height: 0 }; }

  // 変更後の値が w,h 両方入力されていたらそのまま
  if (targetWidth && targetHeight) {
    return { width: targetWidth, height: targetHeight };

  // width 値による計算
  } else if (targetWidth) {
    return calcSizeByPixel(width, height, targetWidth, false);

  // height 値による計算
  } else if (targetHeight) {
    return calcSizeByPixel(width, height, false, targetHeight);

  // percentage による計算
  } else if (targetPercentage) {
    return calcSizeByPercentage(width, height, targetPercentage);
  }
  return { width, height };
};

/**
 * 画像を受け取って現在の input 値を見てリサイズして resolve
 *
 * @param image
 * @return {Object} Promise object
 */
const resizeImage = (image) => {
  const width = parseInt(widthValueNode.value, 10);
  const height = parseInt(heightValueNode.value, 10);
  const targetWidth = parseInt(targetWidthValueNode.value, 10);
  const targetHeight = parseInt(targetHeightValueNode.value, 10);
  const targetPercentage = parseInt(targetPercentageValueNode.value, 10);

  const resize = new ResizeBase64Image(image);

  let outputSize = {};

  // 何も入力されていなければそのまま出力
  if (!targetWidth && !targetHeight && !targetPercentage) {
    return new Promise((resolve) => {
      resolve(image);
    });
  }

  if (targetWidth) {
    outputSize = calcSizeByPixel(width, height, targetWidth, false);
    return resize.bySize(outputSize.width, outputSize.height);
  } else if (targetHeight) {
    outputSize = calcSizeByPixel(width, height, false, targetHeight);
    return resize.bySize(outputSize.width, outputSize.height);
  } else {
    outputSize = calcSizeByPercentage(width, height, targetPercentage);
    return resize.bySize(outputSize.width, outputSize.height);
  }
};


[...document.querySelectorAll('.target-value-input')].forEach((elm) => {
  elm.addEventListener('input', () => {
    const resizedSize = calc();
    resultWidthValueNode.textContent = resizedSize.width;
    resultHeightValueNode.textContent = resizedSize.height;
  });
});


// Drag & Drop によるサイズ入力
'dragover drop'.split(' ').forEach((event) => {
  document.querySelector('body').addEventListener(event, (e) => {
    e.preventDefault();
  });
});
document.querySelector('.image-dnd').addEventListener('drop', (e) => {
  e.preventDefault();
  const reader = new FileReader();
  reader.onload = (rE) => {
    const image = new Image();
    image.onload = () => {
      // 読み込んだ画像のサイズを input へ自動入力
      widthValueNode.value = image.width;
      heightValueNode.value = image.height;
      widthValueNode.parentNode.classList.add('is-dirty');
      heightValueNode.parentNode.classList.add('is-dirty');

      // DnD 直後にも計算
      const resizedSize = calc();
      resultWidthValueNode.textContent = resizedSize.width;
      resultHeightValueNode.textContent = resizedSize.height;

      // リサイズ画像プレビュー
      resizeImage(rE.target.result).then((image) => {
        const previewImage = new Image();
        previewImage.src = image;
        document.querySelector('.preview-list').appendChild(previewImage);
      });
    };
    image.src = rE.target.result;
    // document.querySelector('.preview-list').appendChild(image);
  };
  reader.readAsDataURL(e.dataTransfer.files[0]);
});
