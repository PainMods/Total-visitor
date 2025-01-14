async function updateVisitorCount() {
  try {
    const response = await fetch('/update-count'); // Panggil endpoint serverless function
    const data = await response.json();

    // Update DOM dengan data pengunjung dari backend
    document.getElementById('todayCount').innerText = data.today;
    document.getElementById('allTimeCount').innerText = data.allTime;
  } catch (error) {
    console.error('Error updating visitor count:', error);
  }
}

// Jalankan fungsi saat halaman dimuat
updateVisitorCount();
