function cleanDescription(text) {
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0); // remove empty lines
  
    const uniqueLines = [...new Set(lines)]; // remove duplicates
  
    return uniqueLines.join("\n");
  }
  
  function getCorrectCompanyName(description) {
    const parts = description.split("\n");
    const companyName = parts[0].split(" ·")[0].trim();
  
    return companyName;
  }
  
  function getLocation(description) {
    const parts = description.split("\n");
    const location = parts[0].split(" ·")[0].trim();
  
    return location;
  }

export {
    cleanDescription,
    getCorrectCompanyName,
    getLocation
}