package webpush

import (
	"context"

	pb "github.com/alvidir/webpush/proto"
	"github.com/golang/protobuf/ptypes/empty"
	"github.com/sirupsen/logrus"
)

// SenderService is the contract required from the receiver service in order to make calls
// to the sender's service
type SenderService interface {
	SendNotification(string, *pb.Notification) error
}

// Sender is a SenderService implementation
type Sender string

func (sender Sender) SendNotification(user_id string, noti *pb.Notification) error {
	return nil
}

// SenderDBConn represents a database connection for the sender service
type SenderDBConn interface {
	UpdateNotification(*pb.Notification) (string, error)
}

type SenderServer struct {
	pb.UnimplementedSenderServer
	Log *logrus.Entry
	DB  ReceiverDBConn
}

func (server *ReceiverServer) Send(ctx context.Context, in *pb.SendRequest) (out *empty.Empty, err error) {
	server.Log.Info("Hello world")
	return
}
