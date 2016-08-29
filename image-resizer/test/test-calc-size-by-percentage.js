/* global describe, it */
import assert from 'power-assert';
import calcSizeByPercentage from '../src/scripts/modules/calc-size-by-percentage';

describe('calcSizeByPercentage', () => {
  it('scale down', () => {
    const size = calcSizeByPercentage(3018, 9338, 5);
    assert.deepEqual(size, { width: 151, height: 467 });
  });

  it('scale up', () => {
    const size = calcSizeByPercentage(998, 9938, 758);
    assert.deepEqual(size, { width: 7565, height: 75330 });
  });

  it('will return zero sized object if originWidth is invalid', () => {
    const size = calcSizeByPercentage(NaN, 925, 150);
    assert.deepEqual(size, { width: 0, height: 0 });
  });

  it('will return zero sized object if originHeight is invalid', () => {
    const size = calcSizeByPercentage(925, NaN, false);
    assert.deepEqual(size, { width: 0, height: 0 });
  });

  it('scale 0 will return 0 size object', () => {
    const size = calcSizeByPercentage(998, 9938, 0);
    assert.deepEqual(size, { width: 0, height: 0 });
  });
});
