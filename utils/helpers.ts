export const capitalizeWords = (str: string): string => {
  const words = str.split(' ')

  const capitalizedWords = words.map((word) => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase()
  })

  const result = capitalizedWords.join(' ')

  return result
}
