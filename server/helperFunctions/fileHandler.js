const fs = require("fs");

// Move file to the destination
exports.moveFile = (file, newPath) => {
  return new Promise((resolve, reject) => {
    file.mv(`${newPath}/${file.name}`, (err) => {
      if (err) reject("FAILED");
      else resolve("SUCCESS");
    });
  });
};

// Delete file from the destination
exports.deleteFile = (deleteFile) => {
  return new Promise((resolve, reject) => {
    fs.unlink(deleteFile, (err) => {
      if (err) reject(false);
      resolve("Deleted");
    });
  });
};
