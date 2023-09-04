function loadMultiImages(currentScene = null, imgName = String, imgPath = String, numPictures = Number,) {
  let imageArray = []
  for (let i = 1; i <= numPictures; i++) {
    currentScene.load.image(`${imgName + i}`, `${imgPath + i}.png`)
    imageArray.push(imgName + i)
  }  
  return imageArray
}

export default loadMultiImages