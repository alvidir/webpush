package webpush

import (
	"context"

	pb "github.com/alvidir/webpush/proto"
	"github.com/sirupsen/logrus"
)

// ReceiverDBConn represents a database connection for the receiver service
type ReceiverDBConn interface {
	InsertNotification(*pb.Notification) (string, error)
}

// ReceiverServer is the implementation of the gRPC server with the same name
type ReceiverServer struct {
	pb.UnimplementedReceiverServer
	Log    *logrus.Entry
	DB     ReceiverDBConn
	Sender SenderService
}

func (server *ReceiverServer) Push(ctx context.Context, in *pb.PushRequest) (out *pb.PushResponse, err error) {
	server.Log.Info("Hello world")
	out = &pb.PushResponse{}
	return
}
