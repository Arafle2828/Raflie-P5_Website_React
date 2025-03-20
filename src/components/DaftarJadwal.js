import { useJadwal } from "../context/JadwalContext";
import KomponenJadwal from "./KomponenJadwal";

const DaftarJadwal = () => {
  const { jadwal, loading, error } = useJadwal();

  if (loading) return <p>Memuat data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {jadwal.map((jdwl) => (
        <KomponenJadwal key={jdwl.id} jdwl={jdwl} />
      ))}
    </ul>
  );
};

export default DaftarJadwal;