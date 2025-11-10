// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD6h40vY7anmvLPHwnL-zQFGYmHvXXFvhA",
  authDomain: "tabungasiswa.firebaseapp.com",
  projectId: "tabungasiswa",
  storageBucket: "tabungasiswa.firebasestorage.app",
  messagingSenderId: "419761759477",
  appId: "1:419761759477:web:3d38545ab3b7b06e8f11bc",
  measurementId: "G-E0FD1K3QB3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Fungsi tambah sekolah otomatis
export async function tambahSekolah(nama, quote, kontakAdmin) {
  try {
    const id = nama.toLowerCase().replace(/\s+/g, "-");
    await addDoc(collection(db, "sekolah"), {
      id,
      nama,
      quote,
      kontakAdmin,
      logoUrl: "",
      createdAt: new Date().toISOString()
    });
    alert("✅ Sekolah berhasil ditambahkan!");
  } catch (e) {
    console.error("❌ Gagal menambah sekolah:", e);
    alert("Terjadi kesalahan saat menambah sekolah.");
  }
}

// Fungsi ambil daftar sekolah
export async function ambilDaftarSekolah() {
  const querySnapshot = await getDocs(collection(db, "sekolah"));
  const data = [];
  querySnapshot.forEach((doc) => data.push(doc.data()));
  return data;
}
