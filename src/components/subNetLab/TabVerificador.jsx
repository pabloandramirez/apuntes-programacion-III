import { useState } from "react";
import InputField from "./InputField";
import StepBox from "./StepBox";
import styles from '../../styles/blocks/subNetLab.module.css';
import { calcSubnet, checkBelongs, validateIP } from "./subnetLogic";

export function TabVerificador() {
  const [ip, setIp] = useState("192.168.1.130");
  const [network, setNetwork] = useState("192.168.1.128");
  const [prefix, setPrefix] = useState("25");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const check = () => {
    setError("");

    if (!validateIP(ip)) {
      return setError("IP a verificar inválida");
    }

    if (!validateIP(network)) {
      return setError("Dirección de red inválida");
    }

    const p = parseInt(prefix);

    if (isNaN(p) || p < 0 || p > 32) {
      return setError("Prefijo inválido");
    }

    const belongs = checkBelongs(ip, network, p);
    const subnet = calcSubnet(network, p);

    setResult({ belongs, subnet, ip, prefix: p });
  };

  const r = result;

  return (
    <div>
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          ¿Esta IP pertenece a esta subred?
        </div>

        <div className={styles.row}>
          <InputField
            label="IP a verificar"
            value={ip}
            onChange={setIp}
            placeholder="192.168.1.130"
          />

          <InputField
            label="Dirección de red"
            value={network}
            onChange={setNetwork}
            placeholder="192.168.1.128"
          />

          <InputField
            label="Prefijo CIDR"
            value={prefix}
            onChange={setPrefix}
            placeholder="25"
            type="number"
            min={0}
            max={32}
          />

          <button className={styles.btn} onClick={check}>
            Verificar
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
          <div
            className={`${styles.card} ${
              r.belongs
                ? styles.cardSuccess
                : styles.cardDanger
            }`}
          >
            <div
              className={
                r.belongs
                  ? styles.success
                  : styles.successDanger
              }
            >
              {r.belongs
                ? `✅ SÍ — ${r.ip} PERTENECE a la red ${r.subnet.network}/${r.prefix}`
                : `❌ NO — ${r.ip} NO pertenece a la red ${r.subnet.network}/${r.prefix}`}
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>
              Explicación del cálculo
            </div>

            <StepBox title="Paso 1 — Convertir máscara">
              Prefijo /{r.prefix} → máscara:{" "}
              <span className={styles.accent}>
                {r.subnet.mask}
              </span>
            </StepBox>

            <StepBox title="Paso 2 — Aplicar AND con la IP verificada">
              {r.ip} AND {r.subnet.mask} →{" "}
              <span className={styles.accent}>
                {calcSubnet(r.ip, r.prefix).network}
              </span>
            </StepBox>

            <StepBox title="Paso 3 — Aplicar AND con la dirección de red">
              {r.subnet.network} AND {r.subnet.mask} →{" "}
              <span className={styles.accent}>
                {r.subnet.network}
              </span>
            </StepBox>

            <StepBox title="Paso 4 — Comparar resultados">
              {calcSubnet(r.ip, r.prefix).network}{" "}
              {r.belongs ? "=" : "≠"}{" "}
              {r.subnet.network} →
              <span
                className={
                  r.belongs
                    ? styles.resultOk
                    : styles.resultError
                }
              >
                {" "}
                {r.belongs
                  ? "PERTENECE"
                  : "NO PERTENECE"}
              </span>
            </StepBox>

            <StepBox title="Rango válido de la subred">
              Hosts válidos:{" "}
              <span className={styles.accent}>
                {r.subnet.first}
              </span>{" "}
              →{" "}
              <span className={styles.accent}>
                {r.subnet.last}
              </span>{" "}
              ({r.subnet.usable.toLocaleString()} hosts útiles)
            </StepBox>
          </div>
        </>
      )}
    </div>
  );
}