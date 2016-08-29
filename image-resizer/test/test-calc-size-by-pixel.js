/* global describe, it */
import assert from 'power-assert';
import calcSizeByPixel from '../src/scripts/modules/calc-size-by-pixel';

/** @test {calcSizeByPixel} */
describe('calcSizeByPixel', () => {

  /** @test {calcSizeByPixel#calculateWidthBasedSizeWhichScalesDown} */
  it('calculate width based size which scales down', () => {
    const size = calcSizeByPixel(300, 150, 150, false);
    assert.deepEqual(size, { width: 150, height: 75 });
  });

  it('calculates width based size which scales up', () => {
    const size = calcSizeByPixel(103, 925, 9999, false);
    assert.deepEqual(size, { width: 9999, height: 89797 });
  });

  it('calculates height based size which scales down', () => {
    const size = calcSizeByPixel(1038, 2983, false, 999);
    assert.deepEqual(size, { width: 348, height: 999 });
  });

  it('calculates height based size which scales up', () => {
    const size = calcSizeByPixel(103, 925, false, 9999);
    assert.deepEqual(size, { width: 1113, height: 9999 });
  });

  it('will return zero sized object if originWidth is invalid', () => {
    const size = calcSizeByPixel(NaN, 925, 150, false);
    assert.deepEqual(size, { width: 0, height: 0 });
  });

  it('will return zero sized object if originHeight is invalid', () => {
    const size = calcSizeByPixel(925, NaN, false, false);
    assert.deepEqual(size, { width: 0, height: 0 });
  });

  it('will return same size as target size if passes both value target width and height', () => {
    const size = calcSizeByPixel(925, 110, 1000, 1000);
    assert.deepEqual(size, { width: 1000, height: 1000 });
  });
});
