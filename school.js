const db = window.FB.db;
const auth = window.FB.auth;
const params = new URLSearchParams(location.search);
const schoolId = params.get('school');
const DEFAULT = { name: 'Sekolah', quote: 'Anak hebat selalu menyisihkan uang jajannya untuk ditabung', logo: 'assets/logo.png' };
const titleEl = document.getElementById('schoolTitle');
const nameEl = document.getElementById('schoolNameDisplay');
const logoEl = document.getElementById('logoSek');
const quoteEl = document.getElementById('quote');
async function loadSchool(){
  if(!schoolId) return;
  const doc = await db.collection('sekolah').doc(schoolId).get();
  if(!doc.exists) { titleEl.textContent = 'Sekolah tidak ditemukan'; return; }
  const data = doc.data();
  titleEl.textContent = data.name || DEFAULT.name;
  nameEl.textContent = data.name || DEFAULT.name;
  quoteEl.textContent = data.quote || DEFAULT.quote;
  if(data.logoURL) logoEl.src = data.logoURL;
  document.title = data.name || 'Sekolah';
}
loadSchool();
let tapCount=0, tapTimer=null;
titleEl.addEventListener('click', ()=>{
  tapCount++;
  if(tapTimer) clearTimeout(tapTimer);
  tapTimer = setTimeout(()=> tapCount=0, 1200);
  if(tapCount>=5){ tapCount=0; openLogin(); }
});
if(location.search.indexOf('admin=true')!==-1) openLogin();
function openLogin(){
  const role = prompt('Login sebagai (admin/guru):','admin');
  const email = prompt('Email:');
  const pass = prompt('Password:');
  if(!email||!pass) return alert('Batal');
  auth.signInWithEmailAndPassword(email, pass)
    .then(()=> { alert('Login berhasil'); location.href = 'dashboard.html?school=' + encodeURIComponent(schoolId); })
    .catch(e=> alert('Login gagal: ' + e.message));
}
document.getElementById('viewStudent').addEventListener('click', ()=> {
  document.getElementById('studentView').style.display = 'block';
});
document.getElementById('btnLookup').addEventListener('click', async ()=>{
  const nis = document.getElementById('nisInput').value.trim();
  if(!nis) return alert('Masukkan NIS');
  const sdoc = await db.collection('sekolah').doc(schoolId).collection('data_siswa').doc(nis).get();
  if(!sdoc.exists) return alert('Siswa tidak ditemukan');
  const s = sdoc.data();
  document.getElementById('studentResult').innerHTML = `<h4>${s.name}</h4><p>Kelas: ${s.kelas||'-'}</p><p>Saldo: ${s.saldo||0}</p>`;
});