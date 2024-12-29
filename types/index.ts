export interface AuthenticatedRequest extends Request {
    user: {
      id: string;
    };
  }
  
  export interface UserResponse {
    id: string;
    email: string;
  }
  
  export interface DashboardData {
    totalBalance: number;
    change24h: number;
    totalAssets: number;
    portfolioHistory: Array<{ date: string; value: number }>;
    recentTransactions: Array<{ type: string; date: string; amount: number }>;
  }