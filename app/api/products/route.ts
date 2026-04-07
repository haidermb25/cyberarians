import { NextResponse } from 'next/server'
import { getAllProducts } from '@/lib/server/products'

export async function GET() {
  try {
    const products = await getAllProducts()
    return NextResponse.json(Array.isArray(products) ? products : [])
  } catch {
    return NextResponse.json([])
  }
}
