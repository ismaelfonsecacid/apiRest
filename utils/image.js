function getFileName(file) {
  const filePath = file.path;
  const filesplit = filePath.split("\\");

  return `${filesplit[1]}/${filesplit[2]}`;
}

module.exports = {
  getFileName,
};
