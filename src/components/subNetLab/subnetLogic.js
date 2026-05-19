export function ipToInt(ip) {
  return ip.split(".").reduce((acc, oct) => (acc << 8) | parseInt(oct), 0) >>> 0;
}

export function intToIp(n) {
  return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
}

export function prefixToMask(prefix) {
  return prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
}

export function calcSubnet(ip, prefix) {
  const ipInt = ipToInt(ip);
  const mask = prefixToMask(prefix);
  const network = (ipInt & mask) >>> 0;
  const broadcast = (network | ~mask) >>> 0;
  const first = network + 1;
  const last = broadcast - 1;
  const total = Math.pow(2, 32 - prefix);
  const usable = total - 2;
  const wildcard = (~mask) >>> 0;

  const maskOctets = intToIp(mask).split(".");
  const wildcardOctets = intToIp(wildcard).split(".");

  return {
    ip, prefix,
    network: intToIp(network),
    broadcast: intToIp(broadcast),
    first: intToIp(first),
    last: intToIp(last),
    mask: intToIp(mask),
    wildcard: intToIp(wildcard),
    total, usable,
    networkInt: network,
    broadcastInt: broadcast,
    maskOctets, wildcardOctets,
    bitsHost: 32 - prefix,
  };
}

export function divideSubnet(network, prefix, n) {
  const bitsNeeded = Math.ceil(Math.log2(n));
  const newPrefix = prefix + bitsNeeded;
  if (newPrefix > 32) return null;
  const blockSize = Math.pow(2, 32 - newPrefix);
  const baseInt = ipToInt(network);
  const subnets = [];
  for (let i = 0; i < n; i++) {
    const netInt = (baseInt + i * blockSize) >>> 0;
    const bcast = (netInt + blockSize - 1) >>> 0;
    subnets.push({
      index: i,
      network: intToIp(netInt),
      broadcast: intToIp(bcast),
      first: intToIp(netInt + 1),
      last: intToIp(bcast - 1),
      prefix: newPrefix,
      usable: blockSize - 2,
      blockSize,
    });
  }
  return { subnets, newPrefix, bitsNeeded, blockSize };
}

export function checkBelongs(ip, network, prefix) {
  const ipInt = ipToInt(ip);
  const netInt = ipToInt(network);
  const mask = prefixToMask(prefix);
  return (ipInt & mask) >>> 0 === (netInt & mask) >>> 0;
}

export function validateIP(ip) {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;
  return parts.every(p => !isNaN(p) && parseInt(p) >= 0 && parseInt(p) <= 255);
}
