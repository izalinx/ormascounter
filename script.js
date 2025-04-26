const dataContainer = document.getElementById('data-container');
const apiUrl = 'https://api-e-database.kemendagri.go.id/dataset/1208?sub=tabel&page=1&kode_wilayah=&provinsi=jawa%20barat&jumlah_ormas_ber_skt=&jumlah_ormas_berbadan_hukum='; // Ganti dengan URL API yang ingin Anda gunakan

const refreshInterval = 30 * 60 * 1000; // 30 menit dalam milidetik

function fetchData() {
  dataContainer.innerHTML = '<p>Sedang memuat data...</p>'; // Tampilkan pesan loading setiap kali fetch dilakukan
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Data berhasil diterima:', data);
      dataContainer.innerHTML = `
      <p> Date: ${JSON.stringify(data.data[0]['update_date'], null, 2)}</p> 
      <p> Insert by: ${JSON.stringify(data.data[0]['insert_by'], null, 2)}</p> 
      <p> Approve by: ${JSON.stringify(data.data[0]['approve_by'], null, 2)}</p> 
      <p> Provinsi: ${JSON.stringify(data.data[0]['provinsi'], null, 2)}</p> 
      <p> Jumlah Ormas ber SKT: ${JSON.stringify(data.data[0]['jumlah_ormas_ber_skt'], null, 2)}</p> 
      <p> Jumlah Ormas berbadah hukum: ${JSON.stringify(data.data[0]['jumlah_ormas_berbadan_hukum'], null, 2)}</p>
      `;
    })
    .catch(error => {
      console.error('Gagal mengambil data:', error);
      dataContainer.innerHTML = `<p style="color: red;">Gagal memuat data: ${error.message}</p>`;
    });
}

// Panggil fetchData pertama kali saat halaman dimuat
fetchData();

// Atur interval untuk memanggil fetchData setiap 30 menit
setInterval(fetchData, refreshInterval);