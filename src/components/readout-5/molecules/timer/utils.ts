export const formatMilliseconds = (ms: number) => {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  const tenths = Math.floor((ms % 1000) / 100)
  const hundredths = Math.floor((ms % 100) / 10)

  const paddedSeconds = seconds.toString().padStart(2, '0')

  return `${minutes}${paddedSeconds}${tenths}${hundredths}`
}
