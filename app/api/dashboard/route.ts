import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import dbConnect from '@/lib/db'
import User from '@/models/User'

export async function GET() {
  await dbConnect()

  const cookieStore =await cookies()
  const token = cookieStore.get('token')

  if (!token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET as string) as { id: string }
    const user = await User.findById(decoded.id)

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // In a real application, you would fetch this data from your database or external APIs
    const dashboardData = {
      totalBalance: 75843.52,
      change24h: 24.21,
      totalAssets: 5,
      tokenAllocation: [
        { name: 'Bitcoin', value: 45 },
        { name: 'Ethereum', value: 30 },
        { name: 'Solana', value: 15 },
        { name: 'Cardano', value: 7 },
        { name: 'Others', value: 3 },
      ],
      portfolioHistory: [
        { date: '2023-01', value: 10000 },
        { date: '2023-02', value: 15000 },
        { date: '2023-03', value: 25000 },
        { date: '2023-04', value: 35000 },
        { date: '2023-05', value: 45000 },
        { date: '2023-06', value: 55000 },
        { date: '2023-07', value: 65000 },
        { date: '2023-08', value: 75843 },
      ],
      recentTransactions: [
        { type: 'Buy', date: '2023-08-01', amount: 1000, asset: 'BTC' },
        { type: 'Sell', date: '2023-07-28', amount: -500, asset: 'ETH' },
        { type: 'Buy', date: '2023-07-25', amount: 750, asset: 'SOL' },
        { type: 'Buy', date: '2023-07-20', amount: 1200, asset: 'ADA' },
        { type: 'Sell', date: '2023-07-15', amount: -300, asset: 'BTC' },
      ],
      performance: {
        daily: 2.34,
        weekly: 15.67,
        monthly: 24.21,
        yearly: 156.78
      }
    }

    return NextResponse.json(dashboardData)
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json(
      { message: 'An error occurred while fetching dashboard data' },
      { status: 500 }
    )
  }
}

