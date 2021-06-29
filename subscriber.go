package webpush

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
)

// SubscriberServer implements all these routes required by the subscriber service
type SubscriberServer struct {
	*mux.Router
	NotificationsRepository NotificationsRepository
	SubscriptionsRepository SubscriptionsRepository
	Log                     *logrus.Entry
}

// Init initializes all the enpoints to the server's router
func (server *SubscriberServer) Init() {
	server.HandleFunc("/subscribe", server.Subscribe).Methods(http.MethodPost)
	server.HandleFunc("/u/{ID:[a-zA-Z0-9_]+}", server.Unsubscribe).Methods(http.MethodDelete)
	server.HandleFunc("/u/{ID:[a-zA-Z0-9_]+}/notifications", server.List).Methods(http.MethodGet)
}

func (server *SubscriberServer) Subscribe(w http.ResponseWriter, r *http.Request) {

}

func (server *SubscriberServer) Unsubscribe(w http.ResponseWriter, r *http.Request) {

}

func (server *SubscriberServer) List(w http.ResponseWriter, r *http.Request) {

}
