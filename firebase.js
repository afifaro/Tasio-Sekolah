// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// 🔥 Konfigurasi Firebase kamu
const firebaseConfig = {
  apiKey: "AIzaSyD6h40vY7anmvLPHwnL-zQFGYmHvXXFvhA",
  authDomain: "tabungasiswa.firebaseapp.com",
  projectId: "tabungasiswa",
  storageBucket: "tabungasiswa.appspot.com",
  messagingSenderId: "419761759477",
  appId: "1:419761759477:web:3d38545ab3b7b06e8f11bc",
  measurementId: "G-E0FD1K3QB3",
};

// 🚀 Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// 🔧 Fungsi untuk ubah file ke Base64 (supaya bisa disimpan langsung di Firestore)
async function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// 📤 Tambah sekolah (tanpa Firebase Storage)
export async function tambahSekolah(nama, quote, kontakAdmin, fileLogo) {
  try {
    const id = nama.toLowerCase().replace(/\s+/g, "-");
    let logoBase64 = "";

    if (fileLogo) {
      logoBase64 = await toBase64(fileLogo);
    }

    await addDoc(collection(db, "sekolah"), {
      id,
      nama,
      quote,
      kontakAdmin,
      logoBase64,
      createdAt: new Date().toISOString(),
    });

    alert("✅ Sekolah berhasil ditambahkan!");
  } catch (e) {
    console.error("❌ Gagal menambah sekolah:", e);
    alert("Terjadi kesalahan saat menambah sekolah. Periksa console log.");
  }
}

// 📚 Ambil daftar sekolah dari Firestore
export async function ambilDaftarSekolah() {
  const querySnapshot = await getDocs(collection(db, "sekolah"));
  const data = [];
  querySnapshot.forEach((doc) => data.push(doc.data()));
  return data;
}
