#!/usr/bin/env python3
"""
GCP Pub/Sub Publisher Example
This script demonstrates how to publish messages to a GCP Pub/Sub topic
using default credentials from gcloud auth.
"""

import json
import logging
from datetime import datetime
from google.cloud import pubsub_v1
from google.auth import default

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration
PROJECT_ID = "YOUR_PROJECT_ID"  # Replace with your project ID
TOPIC_ID = "my-example-topic"

def create_publisher_client():
    """Create and return a Pub/Sub publisher client using default credentials."""
    try:
        # Use default credentials from gcloud auth
        credentials, project = default()
        
        if not credentials:
            logger.error("No credentials found. Please run 'gcloud auth application-default login'")
            raise Exception("Authentication required")
        
        logger.info(f"Using credentials for project: {project}")
        
        # Create publisher client
        publisher = pubsub_v1.PublisherClient(credentials=credentials)
        logger.info("Successfully created publisher client")
        return publisher
        
    except Exception as e:
        logger.error(f"Error creating publisher client: {e}")
        raise

def publish_message(publisher, topic_path, message_data):
    """Publish a single message to the topic."""
    try:
        # Convert message to JSON string and encode as bytes
        message_json = json.dumps(message_data)
        message_bytes = message_json.encode("utf-8")
        
        # Publish message
        future = publisher.publish(topic_path, data=message_bytes)
        message_id = future.result()
        
        logger.info(f"Message published successfully. ID: {message_id}")
        return message_id
        
    except Exception as e:
        logger.error(f"Error publishing message: {e}")
        raise

def generate_sample_messages(count=5):
    """Generate sample messages for demonstration."""
    messages = []
    for i in range(count):
        message = {
            "message_id": f"msg_{i+1:03d}",
            "timestamp": datetime.now().isoformat(),
            "content": f"This is sample message number {i+1}",
            "metadata": {
                "source": "python-publisher-example",
                "version": "1.0",
                "sequence": i+1
            }
        }
        messages.append(message)
    return messages

def main():
    """Main function to run the publisher example."""
    try:
        # Verify configuration
        if PROJECT_ID == "YOUR_PROJECT_ID":
            logger.error("Please update PROJECT_ID in the script")
            return
        
        # Create publisher client
        publisher = create_publisher_client()
        
        # Construct topic path
        topic_path = publisher.topic_path(PROJECT_ID, TOPIC_ID)
        logger.info(f"Publishing to topic: {topic_path}")
        
        # Generate and publish sample messages
        messages = generate_sample_messages(5)
        
        for message in messages:
            publish_message(publisher, topic_path, message)
            logger.info(f"Published: {message['message_id']}")
        
        logger.info("All messages published successfully!")
        
    except Exception as e:
        logger.error(f"Error in main execution: {e}")
        raise

if __name__ == "__main__":
    main()
