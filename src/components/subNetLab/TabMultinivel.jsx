import { useState } from "react";
import { divideSubnet, validateIP } from "./subnetLogic";
import styles from '../../styles/blocks/subNetLab.module.css';
import InputField from "./InputField";

export function TabMultinivel() {
  const [ip, setIp] = useState("172.16.0.0");
  const [prefix, setPrefix] = useState("20");
  const [levels, setLevels] = useState([
    { n: "4", selected: null },
  ]);

  const [tree, setTree] = useState(null);
  const [error, setError] = useState("");

  const addLevel = () =>
    setLevels([
      ...levels,
      { n: "8", selected: null },
    ]);

  const removeLevel = (i) => {
    const l = levels.slice(0, i);

    setLevels(
      l.length
        ? l
        : [{ n: "4", selected: null }]
    );

    setTree(null);
  };

  const updateLevel = (i, field, val) => {
    const l = [...levels];

    l[i] = {
      ...l[i],
      [field]: val,
    };

    if (field === "n") {
      l[i].selected = null;

      for (let j = i + 1; j < l.length; j++) {
        l[j].selected = null;
      }
    }

    setLevels(l);
  };

  const calc = () => {
    setError("");

    if (!validateIP(ip)) {
      return setError("IP inválida");
    }

    const p = parseInt(prefix);

    if (isNaN(p) || p < 0 || p > 30) {
      return setError("Prefijo inválido");
    }

    const root = {
      ip,
      prefix: p,
      label: "Raíz",
    };

    let nodes = [root];
    const treeData = [];

    for (let lvl = 0; lvl < levels.length; lvl++) {
      const num = parseInt(levels[lvl].n);

      if (
        isNaN(num) ||
        num < 2 ||
        (num & (num - 1)) !== 0
      ) {
        return setError(
          `Nivel ${lvl + 1}: cantidad debe ser potencia de 2`
        );
      }

      const levelNodes = [];

      for (const parent of nodes) {
        const res = divideSubnet(
          parent.ip,
          parent.prefix,
          num
        );

        if (!res) {
          return setError(
            `Nivel ${lvl + 1}: prefijo supera /32`
          );
        }

        levelNodes.push(
          ...res.subnets.map((s, i) => ({
            ip: s.network,
            prefix: s.prefix,
            broadcast: s.broadcast,
            first: s.first,
            last: s.last,
            usable: s.usable,
            blockSize: s.blockSize,
            label: `${
              parent.label === "Raíz"
                ? ""
                : parent.label + "."
            }${i}`,
            parentIp: parent.ip,
            index: i,
          }))
        );
      }

      treeData.push({
        level: lvl + 1,
        n: num,
        nodes: levelNodes,
        bitsNeeded: Math.ceil(Math.log2(num)),
        newPrefix: levelNodes[0]?.prefix,
      });

      nodes = levelNodes;
    }

    setTree(treeData);
  };

  const selectedAtLevel = (lvl) =>
    levels[lvl]?.selected;

  return (
    <div>
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          Bloque raíz
        </div>

        <div className={styles.row}>
          <InputField
            label="Dirección de red"
            value={ip}
            onChange={setIp}
            placeholder="172.16.0.0"
          />

          <InputField
            label="Prefijo CIDR"
            value={prefix}
            onChange={setPrefix}
            placeholder="20"
            type="number"
            min={0}
            max={30}
          />
        </div>

        <div className={styles.cardTitle}>
          Niveles de subdivisión
        </div>

        {levels.map((lvl, i) => (
          <div
            key={i}
            className={styles.levelRow}
          >
            <div className={styles.levelLabel}>
              Nivel {i + 1}
            </div>

            <InputField
              label="Dividir en N subredes"
              value={lvl.n}
              onChange={(v) =>
                updateLevel(i, "n", v)
              }
              placeholder="4"
              type="number"
              min={2}
              max={256}
            />

            {i > 0 && (
              <div className={styles.fieldWrap}>
                <label className={styles.label}>
                  Subdivide la subred #
                </label>

                <input
                  className={styles.input}
                  type="number"
                  min={0}
                  max={
                    parseInt(levels[i - 1].n) - 1
                  }
                  value={
                    levels[i].selected ?? ""
                  }
                  onChange={(e) =>
                    updateLevel(
                      i,
                      "selected",
                      e.target.value
                    )
                  }
                  placeholder={`0 a ${
                    parseInt(levels[i - 1].n) - 1
                  }`}
                />
              </div>
            )}

            {i > 0 && (
              <button
                className={`${styles.btnGhost} ${styles.btnDanger}`}
                onClick={() => removeLevel(i)}
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <div className={styles.actionsRow}>
          <button
            className={styles.btnGhost}
            onClick={addLevel}
          >
            + Agregar nivel
          </button>

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

      {tree &&
        tree.map((lvlData, li) => (
          <div
            key={li}
            className={styles.card}
          >
            <div className={styles.cardTitle}>
              Nivel {lvlData.level} —
              Prefijo /{lvlData.newPrefix} ·{" "}
              {lvlData.nodes[0]?.usable} hosts
              útiles c/u
            </div>

            <div
              className={`${styles.stepBox} ${styles.stepBoxSpacing}`}
            >
              <span className={styles.accent}>
                {lvlData.n} subredes
              </span>{" "}
              usando {lvlData.bitsNeeded} bits
              adicionales → prefijo original +{" "}
              {lvlData.bitsNeeded} ={" "}
              <span className={styles.accent}>
                /{lvlData.newPrefix}
              </span>{" "}
              · bloque de{" "}
              <span className={styles.accent}>
                {
                  lvlData.nodes[0]
                    ?.blockSize
                }
              </span>{" "}
              direcciones c/u
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>
                      Subred
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

                    <th className={styles.th}>
                      Hosts útiles
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {lvlData.nodes.map(
                    (node, ni) => (
                      <tr
                        key={ni}
                        className={
                          selectedAtLevel(li) ==
                          ni
                            ? styles.tableRowSelected
                            : ""
                        }
                      >
                        <td
                          className={
                            styles.tdHighlight
                          }
                        >
                          {node.label || ni}
                        </td>

                        <td className={styles.td}>
                          {node.ip}/
                          {node.prefix}
                        </td>

                        <td className={styles.td}>
                          {node.ip}
                        </td>

                        <td className={styles.td}>
                          {node.first}
                        </td>

                        <td className={styles.td}>
                          {node.last}
                        </td>

                        <td className={styles.td}>
                          {node.broadcast}
                        </td>

                        <td className={styles.td}>
                          {node.usable}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
    </div>
  );
}