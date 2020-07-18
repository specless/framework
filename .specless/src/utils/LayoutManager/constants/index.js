var LARGE_INTEGER = Math.pow(2, 15) - 1;
module.exports = {
    // if coverage is within this percentage
    MIN_COVER_ERROR: 0.999999,
    // treat as if equal (subpixel is tricky)
    MAX_COVER_ERROR: 1.000001,
    MIN_SCALE: 0.1,
    MAX_SCALE: 1000,
    LARGE_INTEGER: LARGE_INTEGER,
    SMALL_FLOAT: 1 / LARGE_INTEGER
};