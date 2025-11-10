// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

// 🔥 Konfigurasi proyek kamu
const firebaseConfig = {
  apiKey: "AIzaSyD6h40vY7anmvLPHwnL-zQFGYmHvXXFvhA",
  authDomain: "tabungasiswa.firebaseapp.com",
  projectId: "tabungasiswa",
  storageBucket: "tabungasiswa.firebasestorage.app",
  messagingSenderId: "419761759477",
  appId: "1:419761759477:web:3d38545ab3b7b06e8f11bc",
  measurementId: "G-E0FD1K3QB3",
};

// 🔧 Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// 📤 Upload logo ke Storage dan simpan data sekolah ke Firestore
export async function tambahSekolah(nama, quote, kontakAdmin, fileLogo) {
  try {
    const id = nama.toLowerCase().replace(/\s+/g, "-");
    let logoUrl = "";

    // Jika user memilih file logo, upload dulu ke Firebase Storage
    if (fileLogo) {
      const storageRef = ref(storage, `logo_sekolah/${id}.png`);
      const snapshot = await uploadBytes(storageRef, fileLogo);
      logoUrl = await getDownloadURL(snapshot.ref);
    }

    // Simpan data ke Firestore
    await addDoc(collection(db, "sekolah"), {
      id,
      nama,
      quote,
      kontakAdmin,
      logoUrl,
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
