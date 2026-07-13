# Trident Backend (`trident-backend`)

Standalone AWS Serverless API Repository for Trident Institution. Completely decoupled from the Frontend SPA (`Landing Page`).

## Architecture
- **Framework:** Serverless Framework v3 + AWS Lambda (Node.js 18.x)
- **Database:** AWS DynamoDB (`TridentData-prod`)
- **Storage:** AWS S3 (`trident-media-uploads-prod-*`)
- **Authentication:** JWT Bearer Token + Bcrypt Password Hash

## Endpoints
### Public APIs
- `GET /notices`
- `GET /events`

### Protected Admin APIs (Requires `Authorization: Bearer <JWT>`)
- `POST /admin/login`
- `POST /admin/upload`
- `POST /admin/notices`
- `PUT /admin/notices/{id}`
- `DELETE /admin/notices/{id}`
- `POST /admin/events`
- `PUT /admin/events/{id}`
- `DELETE /admin/events/{id}`

## Deployment
```bash
npm install
npx serverless deploy --stage prod
```
