export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb'; // Preciso para o MongoDB saber quem apagar

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('casamento');
    await db.collection('rsvp').insertOne({
      ...body,
      dataConfirmacao: new Date(),
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('casamento');
    const convidados = await db.collection('rsvp').find({}).sort({ dataConfirmacao: -1 }).toArray();
    return NextResponse.json(convidados);
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// NOVO: Função para Apagar
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'Falta o ID' }, { status: 400 });

    const client = await clientPromise;
    const db = client.db('casamento');
    await db.collection('rsvp').deleteOne({ _id: new ObjectId(id) });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}