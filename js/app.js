// Tambah sekolah
document.getElementById("formTambahSekolah").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nama = document.getElementById("namaSekolah").value.trim();
  const quote = document.getElementById("quoteMotivasi").value.trim();
  const file = document.getElementById("logoSekolah").files[0];

  if (!nama || !quote) {
    alert("Nama sekolah dan quote wajib diisi!");
    return;
  }

  try {
    let logoURL = "";

    // Upload file logo ke Firebase Storage
    if (file) {
      const storageRef = firebase.storage().ref(`logo_sekolah/${file.name}`);
      await storageRef.put(file);
      logoURL = await storageRef.getDownloadURL();
    }

    // Simpan ke Firestore
    await firebase.firestore().collection("sekolah").add({
      nama: nama,
      quote: quote,
      logo: logoURL,
      dibuat: firebase.firestore.FieldValue.serverTimestamp()
    });

    alert("✅ Sekolah berhasil ditambahkan!");
    document.getElementById("formTambahSekolah").reset();

    // Panggil ulang daftar sekolah
    muatDaftarSekolah();

  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan: " + error.message);
  }
});
async function muatDaftarSekolah() {
  const daftar = document.getElementById("daftarSekolah");
  daftar.innerHTML = "";

  const snapshot = await firebase.firestore()
    .collection("sekolah")
    .orderBy("dibuat", "desc")
    .get();

  snapshot.forEach((doc) => {
    const data = doc.data();
    daftar.innerHTML += `
      <div class="card">
        <img src="${data.logo || 'assets/default-logo.png'}" alt="Logo Sekolah" style="width:80px;height:80px;border-radius:50%">
        <h3>${data.nama}</h3>
        <p>"${data.quote}"</p>
      </div>
    `;
  });
}

// Jalankan otomatis saat halaman dibuka
window.addEventListener("load", muatDaftarSekolah);

