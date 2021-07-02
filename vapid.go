package webpush

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"encoding/base64"
	"math/big"
)

// DecodeBase64 returns the base64 decodification of a given string
func DecodeBase64(str string) ([]byte, error) {
	bytes, err := base64.URLEncoding.DecodeString(str)
	if err == nil {
		return bytes, nil
	}

	return base64.RawURLEncoding.DecodeString(str)
}

// GenerateVapidPair returns a new VAPID key pair
func GenerateVapidPair() (private, public string, err error) {
	// Get the private key from the P256 curve
	curve := elliptic.P256()

	privateKey, x, y, err := elliptic.GenerateKey(curve, rand.Reader)
	if err != nil {
		return
	}

	publicKey := elliptic.Marshal(curve, x, y)
	private = base64.RawURLEncoding.EncodeToString(privateKey)
	public = base64.RawURLEncoding.EncodeToString(publicKey)

	return
}

// GenerateEcdsaPair generates the ECDSA key pair for the JWT encryption
func GenerateEcdsaPair(private []byte) (pair *ecdsa.PrivateKey, err error) {
	// Public key
	curve := elliptic.P256()
	px, py := curve.ScalarMult(
		curve.Params().Gx,
		curve.Params().Gy,
		private,
	)

	pubKey := ecdsa.PublicKey{
		Curve: curve,
		X:     px,
		Y:     py,
	}

	// Private key
	d := &big.Int{}
	d.SetBytes(private)

	pair = &ecdsa.PrivateKey{
		PublicKey: pubKey,
		D:         d,
	}

	return
}
