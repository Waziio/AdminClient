export default {
  b64ToJpeg: (b64) => {
    return "data:image/jpeg;base64," + b64;
  },
  b64ToPng: (b64) => {
    return "data:image/png;base64," + b64;
  },
};
