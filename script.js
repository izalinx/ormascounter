const dataContainer = document.getElementById('data-container');
const apiUrl = 'https://api-e-database.kemendagri.go.id/dataset/1208?sub=tabel&page=1&kode_wilayah=&provinsi=jawa%20barat&jumlah_ormas_ber_skt=&jumlah_ormas_berbadan_hukum='; // Ganti dengan URL API yang ingin Anda gunakan

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Proses data yang diterima di sini
    console.log('Data berhasil diterima:', data);
    dataContainer.innerHTML = `<pre>${JSON.stringify(data.data, null, 2)}</pre>`; // Menampilkan data dalam format JSON yang rapi
  })
  .catch(error => {
    console.error('Gagal mengambil data:', error);
    dataContainer.innerHTML = `<p style="color: red;">Gagal memuat data: ${error.message}</p>`;
  });