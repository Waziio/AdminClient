class Utils {
  b64ToJpeg(b64) {
    return "data:image/jpeg;base64," + b64;
  }
  b64ToPng(b64) {
    return "data:image/png;base64," + b64;
  }
  async convertToB64(image) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(image);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
  async getUploadedImage(event) {
    console.log("ici");
    try {
      let image = event.files[0];
      let encode = await this.convertToB64(image);
      let base64 = encode.split("base64,")[1];
      return base64;
    } catch (err) {
      return null;
    }
  }
}

export default new Utils();
