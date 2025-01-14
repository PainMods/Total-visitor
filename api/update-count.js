const fs = require('fs');
const path = require('path');

// Path ke file database.json
const databasePath = path.join(__dirname, '../../database.json');

export default function handler(req, res) {
  // Pastikan hanya menerima GET request
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Baca file database.json
    const data = JSON.parse(fs.readFileSync(databasePath, 'utf8'));

    const todayDate = new Date().toISOString().slice(0, 10);

    // Reset hitungan harian jika hari baru
    if (data.lastUpdated !== todayDate) {
      data.today = 0;
      data.lastUpdated = todayDate;
    }

    // Tambahkan hitungan
    data.today += 1;
    data.allTime += 1;

    // Simpan perubahan ke file database.json
    fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));

    // Kirim respons JSON
    return res.status(200).json({ today: data.today, allTime: data.allTime });
  } catch (error) {
    console.error('Error updating count:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
