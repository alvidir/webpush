package webpush

import (
	"context"

	pb "github.com/alvidir/webpush/proto"
	"github.com/sirupsen/logrus"
)

// NotifierDBConn represents a database connection for the notifier service
type NotifierDBConn interface {
	InsertNotification(*pb.Notification) (string, error)
}

// NotifierServer is the implementation of the gRPC server with the same name
type NotifierServer struct {
	pb.UnimplementedNotifierServer
	Log *logrus.Entry
	DB  NotifierDBConn
}

func (server *NotifierServer) Push(ctx context.Context, in *pb.PushRequest) (out *pb.PushResponse, err error) {
	server.Log.Info("Hello world")
	out = &pb.PushResponse{}
	return
}
