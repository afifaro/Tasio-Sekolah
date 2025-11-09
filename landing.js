const db = window.FB.db;
const schoolList = document.getElementById('schoolList');
const form = document.getElementById('addSchoolForm');
async function loadSchools(){
  schoolList.innerHTML = '<li>Memuat...</li>';
  const snap = await db.collection('sekolah').get();
  schoolList.innerHTML = '';
  snap.forEach(doc => {
    const d = doc.data();
    const li = document.createElement('li');
    li.innerHTML = `<a href="school.html?school=${doc.id}">${d.name || doc.id}</a>`;
    schoolList.appendChild(li);
  });
}
loadSchools();
form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const id = document.getElementById('schoolId').value.trim().toLowerCase().replace(/[^a-z0-9\-]/g,'-');
  const name = document.getElementById('schoolName').value.trim();
  if(!id || !name) return alert('Isi id dan nama sekolah.');
  await db.collection('sekolah').doc(id).set({ name, createdAt: firebase.firestore.FieldValue.serverTimestamp(), adminWhatsApp: '6282319001945' });
  document.getElementById('schoolId').value=''; document.getElementById('schoolName').value='';
  loadSchools();
});