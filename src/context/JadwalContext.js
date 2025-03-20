// src/context/JadwalContext.js
import { createContext, useState, useEffect, useContext } from "react";
const JadwalContext = createContext();

export const JadwalGlobal = ({ children }) => {
  const [jadwal, setJadwal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mengambil data dari API saat pertama kali aplikasi dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
        let data = await response.json();
        setJadwal(data.map(item => ({ id: item.id, tugas: item.title })));
      } catch (err) {
        setError("Gagal mengambil data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("jadwal", JSON.stringify(jadwal));
  }, [jadwal]);

  const tambahJadwal = (tugas) => {
    if (!tugas || typeof tugas !== "string") return;
    setJadwal([...jadwal, { id: Date.now(), tugas: tugas.trim() }]);
  };

  const hapusJadwal = (id) => {
    setJadwal(jadwal.filter((jdwl) => jdwl.id !== id));
  };

  return (
    <JadwalContext.Provider value={{ jadwal, tambahJadwal, hapusJadwal, loading, error }}>
      {children}
    </JadwalContext.Provider>
  );
};

export const useJadwal = () => useContext(JadwalContext);