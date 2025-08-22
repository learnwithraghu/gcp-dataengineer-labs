# Storage Bucket Ingestion Example

This example demonstrates how to enable automatic ingestion from a Google Cloud Storage bucket to a Pub/Sub topic using Cloud Storage notifications.

## 🛠️ Setup Steps

### 1. Create Storage Bucket
```bash
# Create a new bucket (replace with your preferred name)
gsutil mb gs://my-pubsub-ingestion-bucket

# Verify bucket creation
gsutil ls
```

### 2. Create Pub/Sub Topic
```bash
# Create topic for storage notifications
gcloud pubsub topics create storage-ingestion-topic

# Verify topic creation
gcloud pubsub topics list
```

### 3. Enable Storage Notifications
```bash
# Enable notifications for the bucket
gsutil notification create -t storage-ingestion-topic \
    -f json gs://my-pubsub-ingestion-bucket

# Verify notification configuration
gsutil notification list gs://my-pubsub-ingestion-bucket
```

### 4. Upload Sample Data
```bash
# Upload the sample JSON file
gsutil cp sample-data.json gs://my-pubsub-ingestion-bucket/

# Upload additional files to test
echo '{"test": "data", "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"}' > test.json
gsutil cp test.json gs://my-pubsub-ingestion-bucket/
```

### 5. Create Subscription to Monitor
```bash
# Create subscription to receive messages
gcloud pubsub subscriptions create storage-subscription \
    --topic=storage-ingestion-topic

# Pull messages to verify ingestion
gcloud pubsub subscriptions pull storage-subscription --auto-ack
```

## 📝 How It Works

1. **Automatic Trigger**: When files are uploaded to the GCS bucket, notifications are automatically sent to the Pub/Sub topic
2. **Message Format**: Each notification contains metadata about the file operation (create, update, delete)
3. **Real-time**: Notifications are sent immediately when files change in the bucket

## 🔍 Verification Steps

1. Check Pub/Sub console for incoming messages
2. Monitor subscription metrics
3. Use `gcloud pubsub subscriptions pull` to see actual messages

## 📊 Sample Message Structure

```json
{
  "kind": "storage#object",
  "id": "bucket/object/1234567890",
  "selfLink": "https://www.googleapis.com/storage/v1/b/bucket/o/object",
  "name": "sample-data.json",
  "bucket": "my-pubsub-ingestion-bucket",
  "generation": "1234567890",
  "metageneration": "1",
  "contentType": "application/json",
  "timeCreated": "2024-01-01T00:00:00.000Z",
  "updated": "2024-01-01T00:00:00.000Z",
  "size": "1234",
  "md5Hash": "hash123",
  "crc32c": "crc32c123"
}
```

## 🧹 Cleanup

```bash
# Delete subscription
gcloud pubsub subscriptions delete storage-subscription

# Delete topic
gcloud pubsub topics delete storage-ingestion-topic

# Delete bucket (will delete all contents)
gsutil rm -r gs://my-pubsub-ingestion-bucket
```

## 💡 Use Cases

- **Data Pipeline Ingestion**: Automatically trigger data processing when new files arrive
- **Event-Driven Architecture**: Use file uploads as triggers for downstream services
- **Real-time Monitoring**: Track file changes and operations in real-time
