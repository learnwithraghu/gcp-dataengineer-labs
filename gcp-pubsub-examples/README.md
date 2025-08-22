# GCP Pub/Sub Examples

This repository contains practical examples demonstrating two different approaches to working with Google Cloud Pub/Sub:

## 📁 Project Structure

```
gcp-pubsub-examples/
├── README.md                           # This file
├── python-publisher/                   # Python publisher example
│   ├── README.md                      # Python example instructions
│   ├── requirements.txt               # Python dependencies
│   └── publisher.py                   # Main publisher script
└── storage-ingestion/                 # Storage bucket ingestion example
    ├── README.md                      # Storage ingestion instructions
    └── sample-data.json               # Sample JSON data for ingestion
```

## 🚀 Quick Start

1. **Python Publisher**: Use default credentials from `gcloud auth` to publish messages to a Pub/Sub topic
2. **Storage Ingestion**: Enable automatic ingestion from a GCS bucket to Pub/Sub

Choose the approach that best fits your use case and follow the specific README in each subfolder.

## ⚠️ Prerequisites

- Google Cloud Project with Pub/Sub API enabled
- `gcloud` CLI configured and authenticated
- Python 3.7+ (for Python example)

## 🔐 Authentication

The Python publisher example uses default credentials from `gcloud auth`, which is simpler and more secure than managing service account keys for development purposes.
