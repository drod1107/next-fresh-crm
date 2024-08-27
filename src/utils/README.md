# `utils/` Directory

The `utils/` directory contains various utility functions that provide common functionality across the application. These functions are designed to be reusable, ensuring that common tasks are handled consistently and efficiently.

## Structure

- `s3.ts`: Handles interactions with Amazon S3 for file uploads and retrievals.

### `s3.ts`

The `s3.ts` file provides utility functions for interacting with Amazon S3, such as uploading files, retrieving them, and managing buckets. This utility is crucial for handling all file storage needs within the application.

#### Key Functions:

- **uploadFile**: Uploads a file to the specified S3 bucket.
- **getFileUrl**: Retrieves the URL of a file stored in S3.
- **deleteFile**: Deletes a file from the S3 bucket.

### Usage

To upload a file to S3, use the `uploadFile` function:

```typescript
import { uploadFile } from '../utils/s3';

export async function handleFileUpload(file) {
    const result = await uploadFile(file);
    return result.Location; // URL of the uploaded file
}
```

### Configuration

Ensure that your S3 credentials and bucket information are set in the `.env.local` file:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `S3_BUCKET_NAME`

These environment variables are used by the utility to authenticate and interact with the S3 service.

### Error Handling

The utility includes error handling mechanisms to manage any issues that may arise during file operations, such as insufficient permissions or invalid file types.

---
