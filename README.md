# Car Auction

This project is a simple car auction system that allows users to bid on cars and the highest bidder wins the auction.

## Getting Started

```sh
aws lambda create-function --function-name car-auction-ingestion --runtime "nodejs20.x" --role arn:aws:iam::123456789012:role/lambda-ex --zip-file "fileb://dist/index.zip" --handler index.handler
```

### Prerequisites

-   Node.js
-   npm
