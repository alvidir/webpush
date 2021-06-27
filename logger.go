package webpush

import "github.com/sirupsen/logrus"

var logger = logrus.New()

func NewLogger() *logrus.Entry {
	// default logger configuration for any Webpush service
	return logger.WithFields(logrus.Fields{
		"app": "webpush",
	})
}
