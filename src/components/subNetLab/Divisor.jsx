import { useState } from 'react';
import styles from '../../styles/blocks/subNetLab.module.css'
import { divideSubnet, validateIP } from './subnetLogic';
import InputField from './InputField';
import StepBox from './StepBox';

export default function TabDivisor() {
  const [ip, setIp] = useState("192.168.40.0");
  const [prefix, setPrefix] = useState("24");
  const [n, setN] = useState("8");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [labels, setLabels] = useState([]);

  const calc = () => {
    setError("");
    if (!validateIP(ip)) return setError("IP de red inválida");
    const p = parseInt(prefix), num = parseInt(n);
    if (isNaN(p) || p < 0 || p > 30) return setError("Prefijo inválido (0–30)");
    if (isNaN(num) || num < 2 || num > 256) return setError("Cantidad debe ser entre 2 y 256");
    if ((num & (num - 1)) !== 0) return setError("La cantidad debe ser potencia de 2 (2, 4, 8, 16, 32...)");
    const res = divideSubnet(ip, p, num);
    if (!res) return setError("El prefijo resultante supera /32");
    setResult(res);
    setLabels(res.subnets.map((_, i) => String(i)));
  };

  const r = result;
  return (
    <div>
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          Dividir un bloque en N subredes iguales
        </div>

        <div className={styles.row}>
          <InputField
            label="Dirección de red"
            value={ip}
            onChange={setIp}
            placeholder="192.168.40.0"
          />

          <InputField
            label="Prefijo CIDR"
            value={prefix}
            onChange={setPrefix}
            placeholder="24"
            type="number"
            min={0}
            max={30}
          />

          <InputField
            label="Cantidad de subredes"
            value={n}
            onChange={setN}
            placeholder="8"
            type="number"
            min={2}
            max={256}
          />

          <button
            className={styles.btn}
            onClick={calc}
          >
            Dividir
          </button>
        </div>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}
      </div>

      {r && (
        <>
          <div className={styles.card}>
            <div className={styles.cardTitle}>
              Explicación del cálculo
            </div>

            <StepBox title="Paso 1 — Bits adicionales necesarios">
              Para {r.subnets.length} subredes:
              2^n = {r.subnets.length} → n ={" "}
              <span className={styles.accent}>
                {r.bitsNeeded} bits adicionales
              </span>
            </StepBox>

            <StepBox title="Paso 2 — Nuevo prefijo">
              Prefijo original /{prefix} +{" "}
              {r.bitsNeeded} bits ={" "}
              <span className={styles.accent}>
                /{r.newPrefix}
              </span>
            </StepBox>

            <StepBox title="Paso 3 — Tamaño de cada bloque">
              2^(32 − {r.newPrefix}) = 2^
              {32 - r.newPrefix} ={" "}
              <span className={styles.accent}>
                {r.blockSize} direcciones por
                subred
              </span>{" "}
              → {r.blockSize} − 2 ={" "}
              <span className={styles.accent}>
                {r.blockSize - 2} hosts útiles
              </span>
            </StepBox>

            <StepBox title="Paso 4 — Dirección de red de cada subred">
              Dir. de red de subred N = dir.
              base + (N × {r.blockSize})
            </StepBox>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>
              Subredes generadas — CIDR /
              {r.newPrefix} ·{" "}
              {r.blockSize - 2} hosts útiles
              c/u
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>
                      Nombre
                    </th>

                    <th className={styles.th}>
                      CIDR
                    </th>

                    <th className={styles.th}>
                      Dir. de red
                    </th>

                    <th className={styles.th}>
                      Primer host
                    </th>

                    <th className={styles.th}>
                      Último host
                    </th>

                    <th className={styles.th}>
                      Broadcast
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {r.subnets.map((s, i) => (
                    <tr key={i}>
                      <td
                        className={
                          styles.tdHighlight
                        }
                      >
                        <input
                          value={labels[i] || ""}
                          onChange={(e) => {
                            const l = [...labels];
                            l[i] =
                              e.target.value;
                            setLabels(l);
                          }}
                          className={
                            styles.subnetNameInput
                          }
                          placeholder={`Subred ${i}`}
                        />
                      </td>

                      <td className={styles.td}>
                        {s.network}/{s.prefix}
                      </td>

                      <td className={styles.td}>
                        {s.network}
                      </td>

                      <td className={styles.td}>
                        {s.first}
                      </td>

                      <td className={styles.td}>
                        {s.last}
                      </td>

                      <td className={styles.td}>
                        {s.broadcast}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}