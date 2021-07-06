export enum Role {
  Admin = 'admin',
  Ghost = 'ghost',
}

export interface LoggedInUser {
  jwt: string;
  account: Account;
}

export interface Account {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  roles: Role[];
  avatar?: Upload;
  isConfirmed: boolean;
}

export interface Upload {
  /**
   * File path, must be prefixed by server host
   * @example 'uploads/public/uuid.jpg'
   */
  path: string;

  /**
   * Resized file path, must be prefixed by server host
   * @example 'uploads/public/uuid-thumb.jpg'
   */
  thumbPath: string;
}
