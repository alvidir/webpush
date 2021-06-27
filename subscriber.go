package webpush

import (
	pb "github.com/alvidir/webpush/proto"
)

// subscriberDBConn represents a database connection for the subscriber service
type subscriberDBConn interface {
	// InsertSubscriber() (string, error)
	// DeleteSubscriber() error
	UpdateNotification(*pb.Notification) (string, error)
	ListNotifications(string, uint) ([]*pb.Notification, error)
	ClearNotifications(string) (int, error)
}
