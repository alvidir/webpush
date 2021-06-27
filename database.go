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
