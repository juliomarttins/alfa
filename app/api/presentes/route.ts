export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

// RECEBER os presentes escolhidos
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('casamento');

    await db.collection('presentes').insertOne({
      ...body,
      dataEscolha: new Date(),
    });

    return NextResponse.json({ success: true, message: 'Presente registrado com sucesso!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Erro ao salvar no banco de dados' }, { status: 500 });
  }
}

// ENVIAR a lista de presentes para o painel Admin
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('casamento');

    const presentesEscolhidos = await db.collection('presentes').find({}).sort({ dataEscolha: -1 }).toArray();

    return NextResponse.json(presentesEscolhidos);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Erro ao buscar presentes' }, { status: 500 });
  }
}

// APAGAR presente no painel Admin
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'Falta o ID' }, { status: 400 });

    const client = await clientPromise;
    const db = client.db('casamento');
    await db.collection('presentes').deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Erro ao apagar presente' }, { status: 500 });
  }
}