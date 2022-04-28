const optimiseImage = (imageUrl) => {
  if (!imageUrl) {
    return "https://via.placeholder.com/640x360";
  }
  return `https://ichef.bbci.co.uk/news/800/cpsprodpb${imageUrl.substring(
    26
  )}.webp`;
};

export default optimiseImage;
