import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 5;
  const search = searchParams.get('search') || '';

  try {
    const response = await axios.get(`${API_URL}/posts`, {
      params: {
        _page: page,
        _limit: limit,
        q: search,
        _sort: 'createdAt',
        _order: 'desc'
      }
    });

    return NextResponse.json(response.data, {
      headers: {
        'X-Total-Count': response.headers['x-total-count']
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const postData = await request.json();
    const response = await axios.post(`${API_URL}/posts`, {
      ...postData,
      createdAt: new Date().toISOString()
    });
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}