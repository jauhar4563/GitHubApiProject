export interface User {
    id: number;
    username: string;
    name: string;
    location: string;
    profile:string;
    bio: string;
    blog: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: Date;
    updated_at: Date;
    repos?: any[];
    deleted_at?: Date | null;
  }
  