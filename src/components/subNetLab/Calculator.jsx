import { useState } from "react";
import { calcSubnet, validateIP } from "./subnetLogic";
import styles from '../../styles/blocks/subNetLab.module.css'
import InputField from "./InputField";
import StatBox from "./StatBox";
import StepBox from "./StepBox";

export default function TabCalculadora() {
  const [ip, setIp] = useState("192.168.1.100");
  const [prefix, setPrefix] = useState("24");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const calc = () => {
    setError("");
    if (!validateIP(ip)) return setError("IP inválida. Formato: 192.168.1.1");
    const p = parseInt(prefix);
    if (isNaN(p) || p < 0 || p > 32) return setError("Prefijo debe estar entre 0 y 32");
    setResult(calcSubnet(ip, p));
  };

  const r = result;
  return (
    <div>
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          Ingresá la dirección IP y el prefijo
        </div>

        <div className={styles.row}>
          <InputField
            label="Dirección IP"
            value={ip}
            onChange={setIp}
            placeholder="192.168.1.100"
          />

          <InputField
            label="Prefijo CIDR"
            value={prefix}
            onChange={setPrefix}
            placeholder="24"
            type="number"
            min={0}
            max={32}
          />

          <button
            className={styles.btn}
            onClick={calc}
          >
            Calcular
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
          <div className={styles.statsGrid}>
            <StatBox
              label="Dirección de red"
              value={r.network}
              small
            />

            <StatBox
              label="Broadcast"
              value={r.broadcast}
              small
            />

            <StatBox
              label="Primer host"
              value={r.first}
              small
            />

            <StatBox
              label="Último host"
              value={r.last}
              small
            />

            <StatBox
              label="Máscara"
              value={r.mask}
              small
            />

            <StatBox
              label="Wildcard"
              value={r.wildcard}
              small
            />

            <StatBox
              label="Hosts útiles"
              value={r.usable.toLocaleString()}
            />

            <StatBox
              label="Hosts totales"
              value={r.total.toLocaleString()}
            />
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>
              Explicación paso a paso
            </div>

            <StepBox title="Paso 1 — Bits de host">
              Prefijo{" "}
              <span className={styles.accent}>
                /{r.prefix}
              </span>{" "}
              → bits de host = 32 − {r.prefix} ={" "}
              <span className={styles.accent}>
                {r.bitsHost} bits
              </span>
            </StepBox>

            <StepBox title="Paso 2 — Hosts totales y útiles">
              2^{r.bitsHost} ={" "}
              <span className={styles.accent}>
                {r.total.toLocaleString()}
              </span>{" "}
              hosts totales → {r.total} − 2 ={" "}
              <span className={styles.accent}>
                {r.usable.toLocaleString()}
              </span>{" "}
              hosts útiles
              (se restan dirección de red y
              broadcast)
            </StepBox>

            <StepBox title="Paso 3 — Máscara de subred">
              {r.prefix} bits en 1, resto en 0 →
              <span className={styles.accent}>
                {" "}
                {r.mask}
              </span>{" "}
              | Wildcard (inverso):{" "}
              <span className={styles.accent}>
                {r.wildcard}
              </span>
            </StepBox>

            <StepBox title="Paso 4 — Dirección de red">
              IP {r.ip} AND máscara {r.mask} →
              se ponen en 0 los bits de host →
              <span className={styles.accent}>
                {" "}
                {r.network}
              </span>
            </StepBox>

            <StepBox title="Paso 5 — Broadcast">
              Dirección de red {r.network} con
              todos los bits de host en 1 →
              <span className={styles.accent}>
                {" "}
                {r.broadcast}
              </span>
            </StepBox>

            <StepBox title="Paso 6 — Rango de hosts">
              Primer host: {r.network} + 1 =
              <span className={styles.accent}>
                {" "}
                {r.first}
              </span>{" "}
              | Último host: {r.broadcast} − 1 =
              <span className={styles.accent}>
                {" "}
                {r.last}
              </span>
            </StepBox>
          </div>
        </>
      )}
    </div>
  );
}