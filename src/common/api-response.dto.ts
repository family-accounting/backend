import { ApiProperty } from '@nestjs/swagger';

/**
 * Standard success response format for API endpoints
 */
export class ApiSuccessResponse<T = any> {
  @ApiProperty({
    description: 'Response data',
    type: 'object',
    additionalProperties: true,
  })
  data: T;

  @ApiProperty({
    description: 'Success message',
    example: 'Operation completed successfully',
  })
  message: string;

  @ApiProperty({
    description: 'HTTP status code',
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Request timestamp',
    example: '2024-01-15T10:30:00.000Z',
  })
  timestamp: string;

  constructor(data: T, message: string = 'Success', statusCode: number = 200) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
  }
}

/**
 * Standard error response format for API endpoints
 */
export class ApiErrorResponse<T = any> {
  @ApiProperty({
    description: 'Error details',
    type: 'object',
    additionalProperties: true,
  })
  error: T;

  @ApiProperty({
    description: 'Error message',
    example: 'Something went wrong',
  })
  message: string;

  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Request timestamp',
    example: '2024-01-15T10:30:00.000Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Error path/endpoint',
    example: '/api/users',
  })
  path?: string;

  constructor(
    error: T,
    message: string = 'An error occurred',
    statusCode: number = 500,
    path?: string,
  ) {
    this.error = error;
    this.message = message;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
    this.path = path;
  }
}

/**
 * Paginated response format for list endpoints
 */
export class ApiPaginatedResponse<T = any> {
  @ApiProperty({
    description: 'Array of data items',
    type: 'array',
  })
  data: T[];

  @ApiProperty({
    description: 'Pagination metadata',
  })
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };

  @ApiProperty({
    description: 'Success message',
    example: 'Data retrieved successfully',
  })
  message: string;

  @ApiProperty({
    description: 'HTTP status code',
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Request timestamp',
    example: '2024-01-15T10:30:00.000Z',
  })
  timestamp: string;

  constructor(
    data: T[],
    total: number,
    page: number,
    limit: number,
    message: string = 'Data retrieved successfully',
  ) {
    this.data = data;
    this.message = message;
    this.statusCode = 200;
    this.timestamp = new Date().toISOString();

    const totalPages = Math.ceil(total / limit);
    this.meta = {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }
}
