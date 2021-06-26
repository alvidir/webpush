package main

import (
	"log"

	"github.com/joho/godotenv"
)

const (
	envPortKey    = "SERVICE_PORT"
	envIntPortKey = "INTERNAL_PORT"
	envNetwKey    = "SERVER_NETW"
	envMongoURI   = "MONGO_URI"
)

func setup() (err error) {
	// to change the flags on the default logger
	log.SetFlags(log.LstdFlags | log.Lshortfile)
	if err = godotenv.Load(); err != nil {
		return
	}

	return
}

func main() {

}
