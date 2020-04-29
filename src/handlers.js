const handleError = (e) => {
  console.error('error while calling:', e.config.url)
}

module.exports = { handleError }
