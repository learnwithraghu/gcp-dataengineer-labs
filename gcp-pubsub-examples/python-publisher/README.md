# Python Publisher Example

This example demonstrates how to publish messages to a GCP Pub/Sub topic using Python and default credentials from `gcloud auth`.

## 🛠️ Setup Steps

### 1. Create Pub/Sub Topic
```bash
# Create a new topic
gcloud pubsub topics create my-example-topic

# Verify topic creation
gcloud pubsub topics list
```

### 2. Authenticate with gcloud
```bash
# Login to your Google Cloud account
gcloud auth login

# Set your project ID
gcloud config set project YOUR_PROJECT_ID

# Set up application default credentials
gcloud auth application-default login
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Update Configuration
- Replace `YOUR_PROJECT_ID` in `publisher.py` with your actual project ID

### 5. Run the Publisher
```bash
python publisher.py
```

## 📝 Code Features

- Publishes sample messages to the specified topic
- Uses default credentials from `gcloud auth` (no service account key needed)
- Includes error handling and logging
- Configurable message count and content

## 🔍 Verification

Check the Pub/Sub console or use:
```bash
gcloud pubsub subscriptions create my-subscription --topic=my-example-topic
gcloud pubsub subscriptions pull my-subscription --auto-ack
```

## 🧹 Cleanup

```bash
# Delete subscription
gcloud pubsub subscriptions delete my-subscription

# Delete topic
gcloud pubsub topics delete my-example-topic
```

## 💡 Benefits of This Approach

- **Simpler Setup**: No need to create or manage service account keys
- **Development Friendly**: Uses your personal credentials for testing
- **Secure**: Credentials are managed by gcloud and stored locally
- **No File Management**: No need to handle JSON key files
