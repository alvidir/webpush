package webpush

import (
	"context"

	pb "github.com/alvidir/webpush/proto"
	"github.com/sirupsen/logrus"
)

// A NotifierService is the implementation of the gRPC server with the same name
type NotifierService interface {
	Push(ctx context.Context, in *pb.PushRequest) (out *pb.PushResponse, err error)
}

// NewNotifierService returns a new server instance
func NewNotifierService(n NotificationsRepository, s SubscriptionsRepository, l *logrus.Entry) NotifierService {
	return &NotifierServer{
		NotificationsRepository: n,
		SubscriptionsRepository: s,
		Log:                     l,
	}
}

// NotifierServer implements all these grpc methods required by the notifier service
type NotifierServer struct {
	pb.UnimplementedNotifierServer
	NotificationsRepository NotificationsRepository
	SubscriptionsRepository SubscriptionsRepository
	Log                     *logrus.Entry
}

func (server *NotifierServer) Push(ctx context.Context, in *pb.PushRequest) (out *pb.PushResponse, err error) {
	out = &pb.PushResponse{}
	return
}
