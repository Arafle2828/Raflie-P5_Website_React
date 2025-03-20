import { useJadwal } from "../context/JadwalContext";
import { useState } from "react";

const KomponenJadwal = ({ jdwl }) => {
  const { hapusJadwal, editJadwal } = useJadwal();
  const [isEditing, setIsEditing] = useState(false);
  const [newTugas, setNewTugas] = useState(jdwl.tugas);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editJadwal(jdwl.id, newTugas);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <input type="text" value={newTugas} onChange={(e) => setNewTugas(e.target.value)} />
      ) : (
        jdwl.tugas
      )}
      {isEditing ? (
        <button onClick={handleSave}>Simpan</button>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
      <button onClick={() => hapusJadwal(jdwl.id)}>Hapus</button>
    </li>
  );
};

export default KomponenJadwal;
