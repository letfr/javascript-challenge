/*
 * Regex
 */

/* ENUNCIADO
 *
 * Escreva uma função que busque no texto os valores de "height" e "width"
 * e retorne um objeto { "height": x, "width": y } contendo esses valores ignorando sua medida (px, %, em).
 *
 * Ex:1
 * [INPUT]
 * "<div style="height: 20px; width: 60px;">"
 * [OUTPUT]
 * {
 *   height: 20,
 *   width: 60
 * }
 *
 * Ex: 2
 * [INPUT] String
 * "<div style="background-color: red;"> <img style="width: 120px; height: 20%" /></div>"
 * [OUTPUT] Object
 * {
 *   width: 120,
 *   height: 20
 * }
 */

const extractSize = htmlTemplate => {
  const extracted = htmlTemplate.match(/(width:|height:)\s(\d*)/g)
  const extractNumber = el => el.match(/[0-9]/g).join('')
  let sizes = {}

  if (extracted !== null) {
    extracted.forEach(el => {
      if (el.includes('height') && !sizes.height) {
        sizes.height = parseInt(extractNumber(el))
      } else if (el.includes('width') && !sizes.width) {
        sizes.width = parseInt(extractNumber(el))
      }
    })
  } else {
    sizes.height = 0
    sizes.width = 0
  }
  return sizes
}

module.exports = extractSize
