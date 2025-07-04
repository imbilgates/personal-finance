import dbConnect from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function GET() {
  await dbConnect();
  const transactions = await Transaction.find().sort({ createdAt: -1 });
  return Response.json(transactions);
}

export async function POST(request) {
  await dbConnect();
  const data = await request.json();
  const transaction = await Transaction.create(data);
  return Response.json(transaction);
}
