document.getElementById('uploadForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
  
    const fileInput = document.getElementById('idFile');
    const file = fileInput.files[0];
  
    if (file) {
      // Simulate file upload (you can replace this with an actual API call)
      console.log('Uploading file:', file.name);
      alert('File uploaded successfully!');
    } else {
      alert('Please select a file to upload.');
    }
  });

document.getElementById('barcodeInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    verifyID();
  }
});

function verifyID() {
  const barcode = document.getElementById('barcodeInput').value;
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  fetch('ID.xlsx')
    .then(response => response.arrayBuffer())
    .then(data => {
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);

      const record = rows.find(row => row.ID === barcode);

      if (record) {
        resultDiv.innerHTML = `
          <p>ID: ${record.ID}</p>
          <p>Rank: ${record.Rank}</p>
          <p>Surname: ${record.Surname}</p>
          <p>Unit: ${record.Unit}</p>
          <p>Status: ${record.Status}</p>
        `;
      } else {
        resultDiv.innerHTML = '<p>ID is invalid</p>';
      }
    })
    .catch(error => {
      console.error('Error reading the Excel file:', error);
      resultDiv.innerHTML = '<p>Error reading the Excel file</p>';
    });
}