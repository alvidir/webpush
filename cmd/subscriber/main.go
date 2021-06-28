package main

import (
	"context"
	"net"
	"net/http"

	"github.com/alvidir/go-util"
	"github.com/alvidir/webpush"
	"github.com/joho/godotenv"
	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	envAddrKey = "SERVER_ADDR"
	envNetwKey = "SERVER_NETW"
	envDataURI = "MONGO_URI"

	errEnvNotFound = "environment variable not found"
	errMongoSetup  = "mongodb init has failed"
)

var (
	serviceAddr = ":8080"
	serviceNetw = "tcp"
	mongoConn   = webpush.MongoConn{}
	log         = webpush.NewLogger()
	rootCtx     = context.Background()
)

func init() {
	log = log.WithField("service", "subscriber")
	if err := godotenv.Load(); err != nil {
		log.WithError(err).Warn("dotenv has failed")
	}

	// DATABASE CONFIGURATION
	if env, err := util.LookupNempEnv(envDataURI); err != nil {
		log.WithField("key", envDataURI).Panic(errEnvNotFound)
	} else if mongoConn.Client, err = mongo.NewClient(options.Client().ApplyURI(env)); err != nil {
		log.WithError(err).Panic(errMongoSetup)
	} else if err = mongoConn.Client.Connect(rootCtx); err != nil {
		log.WithContext(rootCtx).WithError(err).WithField("method", "connect").Panic(errMongoSetup)
	} else if err = mongoConn.Client.Ping(rootCtx, nil); err != nil {
		log.WithContext(rootCtx).WithError(err).WithField("method", "ping").Panic(errMongoSetup)
	}

	// SERVER CONFIGURATION
	if env, err := util.LookupNempEnv(envAddrKey); err != nil {
		log.WithField("key", envAddrKey).Warn(errEnvNotFound)
	} else {
		serviceAddr = env
	}

	if env, err := util.LookupNempEnv(envNetwKey); err != nil {
		log.WithField("key", envNetwKey).Warn(errEnvNotFound)
	} else {
		serviceNetw = env
	}
}

func main() {
	defer mongoConn.Disconnect(rootCtx)

	lis, err := net.Listen(serviceNetw, serviceAddr)
	if err != nil {
		log.WithError(err).Panic("failed to listen")
	}

	server := webpush.NewSubscriberService(
		&mongoConn,
		&mongoConn,
		log,
	)

	log.WithFields(logrus.Fields{
		"network": serviceNetw,
		"address": serviceAddr,
	}).Info("service setup complete: ready to serve")

	if err = http.Serve(lis, server); err != nil {
		log.WithError(err).Panic("failed to serve")
	}
}
