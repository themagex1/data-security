import { getPrivateKey } from '@/services/sessionProps'

export const DiffieHellman = {
  async setUpDFHKeys () {
    let clientKey = await window.crypto.subtle.generateKey(
      { name: 'ECDH', namedCurve: 'P-256' },
      true,
      ['deriveKey']
    )
    const publicKeyData = await window.crypto.subtle.exportKey('spki', clientKey.publicKey)
    const publicKeyBytes = new Uint8Array(publicKeyData)
    const publicKeyB64 = btoa(String.fromCharCode.apply(null, publicKeyBytes))
    const privateKeyData = await window.crypto.subtle.exportKey('pkcs8', clientKey.privateKey)
    const privateKeyBytes = new Uint8Array(privateKeyData)
    const privateKeyB64 = btoa(String.fromCharCode.apply(null, privateKeyBytes))
    return {
      publicKeyB64,
      privateKeyB64
    }
  },
  async getSharedSecret (serverPublicKey) {
    let clientPrivateKey = getPrivateKey()
    let privateKey = await window.crypto.subtle.importKey(
      'pkcs8',
      new Uint8Array(getDiffieHellman()._base64ToArrayBuffer(clientPrivateKey)),
      { name: 'ECDH', namedCurve: 'P-256' },
      true,
      ['deriveKey', 'deriveBits']
    )
    let publicKey = await window.crypto.subtle.importKey(
      'spki',
      new Uint8Array(getDiffieHellman()._base64ToArrayBuffer(serverPublicKey)),
      { name: 'ECDH', namedCurve: 'P-256' },
      true,
      []
    )
    let sharedSecret = await window.crypto.subtle.deriveBits(
      { name: 'ECDH', namedCurve: 'P-256', public: publicKey },
      privateKey,
      256
    )
    let sharedSecretHash = await crypto.subtle.digest('SHA-256', sharedSecret)
    let sharedSecretHashB64 = btoa(String.fromCharCode.apply(null, new Uint8Array(sharedSecretHash)))
    console.log('Bob\'s shared secret: ' + sharedSecretHashB64.replace(/(.{64})/g, '$1\n'))
    return sharedSecretHashB64.replace(/(.{64})/g, '$1\n')
  },
  _base64ToArrayBuffer (base64) {
    let binary_string = window.atob(base64)
    let len = binary_string.length
    let bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i)
    }
    return bytes.buffer
  }

}

export function getDiffieHellman () {
  return DiffieHellman
}
