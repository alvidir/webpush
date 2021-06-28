package webpush

import (
	"go.mongodb.org/mongo-driver/mongo"
)

// SubscriptionsRepository represents a database connection for subscriber's management
type SubscriptionsRepository interface {
	InsertSubscriber(SubscriberCtrl) (string, error)
	DeleteSubscriber(string) error
}

// NotificationsRepository represents a database connection for the notifier service
type NotificationsRepository interface {
	InsertNotification(NotificationCtrl) (string, error)
	UpdateNotification(NotificationCtrl) (string, error)
	ListNotifications(string, uint, uint) ([]NotificationCtrl, error)
	DeleteNotification(string) error
}

type MongoConn struct {
	*mongo.Client
}

func (client *MongoConn) InsertNotification(noti NotificationCtrl) (pk string, err error) {
	return "", nil
}

func (client *MongoConn) UpdateNotification(NotificationCtrl) (string, error) {
	return "", nil
}

func (client *MongoConn) ListNotifications(id string, size, page uint) ([]NotificationCtrl, error) {
	return nil, nil
}

func (client *MongoConn) DeleteNotification(id string) error {
	return nil
}

func (client *MongoConn) InsertSubscriber(sub SubscriberCtrl) (string, error) {
	return "", nil
}

func (client *MongoConn) DeleteSubscriber(id string) error {
	return nil
}
