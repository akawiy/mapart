export async function parseCSV(path) {
    const text = await fetch(path)
    .then(content => content.text());

    const lines = text.trim().split("\n");
    const headers = lines[0].split(",").map(header => header.trim());

    const data = lines.slice(1).map(line => {
        const values = line.split(",");
        const row = {};
        
        headers.forEach((header, i) => {
            const value = values[i];
            row[header] = isNaN(value) ? value : +value;
        });
      
        return row;
    });

    return data;
}
