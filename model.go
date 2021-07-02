package webpush

import (
	"encoding/base64"
	"fmt"
	"net/url"
	"time"

	"github.com/golang-jwt/jwt"
)

// A MetadataCtrl represents an instance of Metadata
type MetadataCtrl interface {
	GetAppId() string
	GetCreatedAt() string
	GetUrgency() string
}

// A NotificationCtrl represents a notification instance
type NotificationCtrl interface {
	GetTitle() string
	GetBody() string
	GetUrl() string
	GetIconUrl() string
	GetMetadata() MetadataCtrl
}

// A SubscriptionCtrl represents a subscriber instance
type SubscriptionCtrl interface {
	ID() string
	Token(endpoint string, private, public []byte) (string, error)
}

type subscription struct {
	id    string
	email string
	token string
}

func (s *subscription) generateJWT(endpoint string, private, public []byte) (string, error) {
	subURL, err := url.Parse(endpoint)
	if err != nil {
		return "", err
	}

	token := jwt.NewWithClaims(jwt.SigningMethodES256, jwt.MapClaims{
		"aud": fmt.Sprintf("%s://%s", subURL.Scheme, subURL.Host),
		"exp": time.Now().Add(time.Hour * 12).Unix(),
		"sub": fmt.Sprintf("mailto:%s", s.email),
	})

	privateKey, err := GenerateEcdsaPair(private)
	if err != nil {
		return "", err
	}

	// Sign token with private key
	jwtString, err := token.SignedString(privateKey)
	if err != nil {
		return "", err
	}

	return fmt.Sprintf(
		"vapid t=%s, k=%s",
		jwtString,
		base64.RawURLEncoding.EncodeToString(public),
	), nil
}

func (s *subscription) ID() string {
	return s.id
}

func (s *subscription) Token(endpoint string, private, public []byte) (string, ) {
	return s.generateJWT(endpoint string)
}
