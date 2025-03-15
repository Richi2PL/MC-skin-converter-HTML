function asyncImage (src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function asyncFileReader (file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = () => resolve(fr)
    fr.onerror = reject
    fr.readAsDataURL(file)
  })
}

async function convert (input, canvas, result) {
  const file = input.files[0]
  if (file.type !== 'image/png') { return }

  const fr = await asyncFileReader(file)
  const img = await asyncImage(fr.result)

  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, 0, 0)
  ctx.drawImage(img, 0, 32, 56, 16, 0, 16, 56, 16)

  result.src = canvas.toDataURL('image/png')
}

const fileInput = document.getElementById('file')
const download = document.getElementById('download')
const result = document.getElementById('result')
const canvas = document.createElement('canvas')

canvas.width = 64
canvas.height = 32

result.onload = () => download.href = result.src
fileInput.onchange = () => convert(fileInput, canvas, result)
