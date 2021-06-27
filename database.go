package webpush

import (
	pb "github.com/alvidir/webpush/proto"
	"go.mongodb.org/mongo-driver/mongo"
)

type MongoConn struct {
	*mongo.Client
}

func (client *MongoConn) InsertNotification(noti *pb.Notification) (pk string, err error) {
	return "", nil
}

func (client *MongoConn) UpdateNotification(*pb.Notification) (string, error) {
	return "", nil
}

func (client *MongoConn) ListNotifications(string, uint) ([]*pb.Notification, error) {
	return nil, nil
}

func (client *MongoConn) ClearNotifications(string) (int, error) {
	return 0, nil
}
