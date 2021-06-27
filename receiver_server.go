package webpush

import (
	"context"

	pb "github.com/alvidir/webpush/proto"
	"github.com/sirupsen/logrus"
)

type ReceiverDBConn interface {
	InsertNotification(*pb.Notification) (string, error)
}

type ReceiverServer struct {
	pb.UnimplementedReceiverServer
	Log *logrus.Entry
	DB  ReceiverDBConn
}

func (server *ReceiverServer) Push(ctx context.Context, in *pb.PushRequest) (out *pb.PushResponse, err error) {
	server.Log.Info("Hello world")
	out = &pb.PushResponse{}
	return
}
