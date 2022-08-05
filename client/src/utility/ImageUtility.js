export const isImageLink = (text) => {
  if (typeof text !== "string") {
    return false;
  }
  return (
    text.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) !== null
  );
};

export const getTransformedImage = (url) => {
  const substring = "upload/";
  const index = url.indexOf(substring) + substring.length;
  const size = 300;
  return (
    url.slice(0, index) + `w_${size},h_${size},c_limit/` + url.slice(index)
  );
};
