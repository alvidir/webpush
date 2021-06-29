package webpush

// A MetadataCtrl represents an instance of Metadata
type MetadataCtrl interface {
	GetAppId() string
	GetCreatedAt() string
	GetUrgency() string
}

// A NotificationCtrl represents a notification instance
type NotificationCtrl interface {
	GetTitle() string
	GetBody() string
	GetUrl() string
	GetIconUrl() string
	GetMetadata() MetadataCtrl
}

// A SubscriberCtrl represents a subscriber instance
type SubscriberCtrl interface {
	GetUserId() string
}
