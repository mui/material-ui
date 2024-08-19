// This color conversion code has been extracted from chrome devtools. It has been edited
// to remove Matrix & Vector classes, as well as remove the code for colorspaces unsupported
// by MUI. Should more colorspaces be needed, the source below has the complete list.
//
// Source: https://github.com/ChromeDevTools/devtools-frontend/blob/c51201e6ee70370f7f1ac8a1a49dca7d4561aeaa/front_end/core/common/ColorConverter.ts
// LICENSE: https://github.com/ChromeDevTools/devtools-frontend/blob/c51201e6ee70370f7f1ac8a1a49dca7d4561aeaa/LICENSE
//
// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Implementation of this module and all the tests are heavily influenced by
 * https://source.chromium.org/chromium/chromium/src/+/main:ui/gfx/color_conversions.cc
 */

type Matrix3x3 = [[number, number, number], [number, number, number], [number, number, number]];

type Vector3 = [number, number, number];

function multiply(matrix: Matrix3x3, other: Vector3): Vector3 {
  const dst = [0, 0, 0] as Vector3;
  for (let row = 0; row < 3; ++row) {
    dst[row] = matrix[row][0] * other[0] + matrix[row][1] * other[1] + matrix[row][2] * other[2];
  }
  return dst;
}

// A transfer function mapping encoded values to linear values,
// represented by this 7-parameter piecewise function:
//
//   linear = sign(encoded) *  (c*|encoded| + f)       , 0 <= |encoded| < d
//          = sign(encoded) * ((a*|encoded| + b)^g + e), d <= |encoded|
//
// (A simple gamma transfer function sets g to gamma and a to 1.)
class TransferFunction {
  g: number;
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;

  constructor(
    g: number,
    a: number,
    b: number = 0,
    c: number = 0,
    d: number = 0,
    e: number = 0,
    f: number = 0,
  ) {
    this.g = g;
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
  }

  eval(val: number): number {
    const sign = val < 0 ? -1.0 : 1.0;
    const abs = val * sign;

    // 0 <= |encoded| < d path
    if (abs < this.d) {
      return sign * (this.c * abs + this.f);
    }

    // d <= |encoded| path
    return sign * (Math.pow(this.a * abs + this.b, this.g) + this.e);
  }
}

const NAMED_TRANSFER_FN = {
  sRGB: new TransferFunction(2.4, 1 / 1.055, 0.055 / 1.055, 1 / 12.92, 0.04045, 0.0, 0.0),
  sRGB_INVERSE: new TransferFunction(0.416667, 1.13728, -0, 12.92, 0.0031308, -0.0549698, -0),

  proPhotoRGB: new TransferFunction(1.8, 1),
  proPhotoRGB_INVERSE: new TransferFunction(0.555556, 1, -0, 0, 0, 0, 0),

  k2Dot2: new TransferFunction(2.2, 1.0),
  k2Dot2_INVERSE: new TransferFunction(0.454545, 1),

  rec2020: new TransferFunction(2.22222, 0.909672, 0.0903276, 0.222222, 0.0812429, 0, 0),
  rec2020_INVERSE: new TransferFunction(0.45, 1.23439, -0, 4.5, 0.018054, -0.0993195, -0),
};

const NAMED_GAMUTS = {
  sRGB: [
    [0.436065674, 0.385147095, 0.143066406],
    [0.222488403, 0.716873169, 0.06060791],
    [0.013916016, 0.097076416, 0.714096069],
  ] as Matrix3x3,
  sRGB_INVERSE: [
    [3.134112151374599, -1.6173924597114966, -0.4906334036481285],
    [-0.9787872938826594, 1.9162795854799963, 0.0334547139520088],
    [0.07198304248352326, -0.2289858493321844, 1.4053851325241447],
  ] as Matrix3x3,
  displayP3: [
    [0.515102, 0.291965, 0.157153],
    [0.241182, 0.692236, 0.0665819],
    [-0.00104941, 0.0418818, 0.784378],
  ] as Matrix3x3,
  displayP3_INVERSE: [
    [2.404045155982687, -0.9898986932663839, -0.3976317191366333],
    [-0.8422283799266768, 1.7988505115115485, 0.016048170293157416],
    [0.04818705979712955, -0.09737385156228891, 1.2735066448052303],
  ] as Matrix3x3,
  adobeRGB: [
    [0.60974, 0.20528, 0.14919],
    [0.31111, 0.62567, 0.06322],
    [0.01947, 0.06087, 0.74457],
  ] as Matrix3x3,
  adobeRGB_INVERSE: [
    [1.9625385510109137, -0.6106892546501431, -0.3413827467482388],
    [-0.9787580455521, 1.9161624707082339, 0.03341676594241408],
    [0.028696263137883395, -0.1406807819331586, 1.349252109991369],
  ] as Matrix3x3,
  rec2020: [
    [0.673459, 0.165661, 0.1251],
    [0.279033, 0.675338, 0.0456288],
    [-0.00193139, 0.0299794, 0.797162],
  ] as Matrix3x3,
  rec2020_INVERSE: [
    [1.647275201661012, -0.3936024771460771, -0.23598028884792507],
    [-0.6826176165196962, 1.647617775014935, 0.01281626807852422],
    [0.029662725298529837, -0.06291668721366285, 1.2533964313435522],
  ] as Matrix3x3,
  xyz: [
    [1.0, 0.0, 0.0],
    [0.0, 1.0, 0.0],
    [0.0, 0.0, 1.0],
  ] as Matrix3x3,
};

function applyTransferFns(
  fn: TransferFunction,
  r: number,
  g: number,
  b: number,
): [number, number, number] {
  return [fn.eval(r), fn.eval(g), fn.eval(b)];
}

const PRO_PHOTO_TO_XYZD50_MATRIX = [
  [0.7976700747153241, 0.13519395152800417, 0.03135596341127167],
  [0.28803902352472205, 0.7118744007923554, 0.00008661179538844252],
  [2.739876695467402e-7, -0.0000014405226518969991, 0.825211112593861],
] as Matrix3x3;
// Inverse of PRO_PHOTO_TO_XYZD50_MATRIX
const XYZD50_TO_PRO_PHOTO_MATRIX = [
  [1.3459533710138858, -0.25561367037652133, -0.051116041522131374],
  [-0.544600415668951, 1.5081687311475767, 0.020535163968720935],
  [-0.0000013975622054109725, 0.000002717590904589903, 1.2118111696814942],
] as Matrix3x3;

const XYZD65_TO_XYZD50_MATRIX = [
  [1.0478573189120088, 0.022907374491829943, -0.050162247377152525],
  [0.029570500050499514, 0.9904755577034089, -0.017061518194840468],
  [-0.00924047197558879, 0.015052921526981566, 0.7519708530777581],
] as Matrix3x3;
// Inverse of XYZD65_TO_XYZD50_MATRIX
const XYZD50_TO_XYZD65_MATRIX = [
  [0.9555366447632887, -0.02306009252137888, 0.06321844147263304],
  [-0.028315378228764922, 1.009951351591575, 0.021026001591792402],
  [0.012308773293784308, -0.02050053471777469, 1.3301947294775631],
] as Matrix3x3;

export function displayP3ToXyzd50(r: number, g: number, b: number): [number, number, number] {
  const [mappedR, mappedG, mappedB] = applyTransferFns(NAMED_TRANSFER_FN.sRGB, r, g, b);
  const rgbInput = [mappedR, mappedG, mappedB] as Vector3;
  const xyzOutput = multiply(NAMED_GAMUTS.displayP3, rgbInput);
  return xyzOutput;
}

export function xyzd50ToDisplayP3(x: number, y: number, z: number): [number, number, number] {
  const xyzInput = [x, y, z] as Vector3;
  const rgbOutput = multiply(NAMED_GAMUTS.displayP3_INVERSE, xyzInput);
  return applyTransferFns(NAMED_TRANSFER_FN.sRGB_INVERSE, rgbOutput[0], rgbOutput[1], rgbOutput[2]);
}

export function proPhotoToXyzd50(r: number, g: number, b: number): [number, number, number] {
  const [mappedR, mappedG, mappedB] = applyTransferFns(NAMED_TRANSFER_FN.proPhotoRGB, r, g, b);
  const rgbInput = [mappedR, mappedG, mappedB] as Vector3;
  const xyzOutput = multiply(PRO_PHOTO_TO_XYZD50_MATRIX, rgbInput);
  return xyzOutput;
}

export function xyzd50ToProPhoto(x: number, y: number, z: number): [number, number, number] {
  const xyzInput = [x, y, z] as Vector3;
  const rgbOutput = multiply(XYZD50_TO_PRO_PHOTO_MATRIX, xyzInput);
  return applyTransferFns(
    NAMED_TRANSFER_FN.proPhotoRGB_INVERSE,
    rgbOutput[0],
    rgbOutput[1],
    rgbOutput[2],
  );
}

export function adobeRGBToXyzd50(r: number, g: number, b: number): [number, number, number] {
  const [mappedR, mappedG, mappedB] = applyTransferFns(NAMED_TRANSFER_FN.k2Dot2, r, g, b);
  const rgbInput = [mappedR, mappedG, mappedB] as Vector3;
  const xyzOutput = multiply(NAMED_GAMUTS.adobeRGB, rgbInput);
  return xyzOutput;
}

export function xyzd50ToAdobeRGB(x: number, y: number, z: number): [number, number, number] {
  const xyzInput = [x, y, z] as Vector3;
  const rgbOutput = multiply(NAMED_GAMUTS.adobeRGB_INVERSE, xyzInput);
  return applyTransferFns(
    NAMED_TRANSFER_FN.k2Dot2_INVERSE,
    rgbOutput[0],
    rgbOutput[1],
    rgbOutput[2],
  );
}

export function rec2020ToXyzd50(r: number, g: number, b: number): [number, number, number] {
  const [mappedR, mappedG, mappedB] = applyTransferFns(NAMED_TRANSFER_FN.rec2020, r, g, b);
  const rgbInput = [mappedR, mappedG, mappedB] as Vector3;
  const xyzOutput = multiply(NAMED_GAMUTS.rec2020, rgbInput);
  return xyzOutput;
}

export function xyzd50ToRec2020(x: number, y: number, z: number): [number, number, number] {
  const xyzInput = [x, y, z] as Vector3;
  const rgbOutput = multiply(NAMED_GAMUTS.rec2020_INVERSE, xyzInput);
  return applyTransferFns(
    NAMED_TRANSFER_FN.rec2020_INVERSE,
    rgbOutput[0],
    rgbOutput[1],
    rgbOutput[2],
  );
}

export function xyzd50ToD65(x: number, y: number, z: number): [number, number, number] {
  const xyzInput = [x, y, z] as Vector3;
  const xyzOutput = multiply(XYZD50_TO_XYZD65_MATRIX, xyzInput);
  return xyzOutput;
}

export function xyzd65ToD50(x: number, y: number, z: number): [number, number, number] {
  const xyzInput = [x, y, z] as Vector3;
  const xyzOutput = multiply(XYZD65_TO_XYZD50_MATRIX, xyzInput);
  return xyzOutput;
}

export function srgbToXyzd50(r: number, g: number, b: number): [number, number, number] {
  const [mappedR, mappedG, mappedB] = applyTransferFns(NAMED_TRANSFER_FN.sRGB, r, g, b);
  const rgbInput = [mappedR, mappedG, mappedB] as Vector3;
  const xyzOutput = multiply(NAMED_GAMUTS.sRGB, rgbInput);
  return xyzOutput;
}

export function xyzd50ToSrgb(x: number, y: number, z: number): [number, number, number] {
  const xyzInput = [x, y, z] as Vector3;
  const rgbOutput = multiply(NAMED_GAMUTS.sRGB_INVERSE, xyzInput);
  return applyTransferFns(NAMED_TRANSFER_FN.sRGB_INVERSE, rgbOutput[0], rgbOutput[1], rgbOutput[2]);
}
